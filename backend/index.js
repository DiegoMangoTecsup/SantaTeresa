// index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors());

app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/Theresa', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conexión a MongoDB establecida');
})
.catch((error) => {
  console.error('Error al conectar a MongoDB:', error);
});


// Definir el esquema de usuario
const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  numero: String,
  dni: String,
  password: String,
  tipo: String,
  area: { type: String, default: null },
});

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Definir el endpoint para ingresar datos de Usuario
app.post('/usuarios', async (req, res) => {
  try {
    const { nombre, numero, dni, cargo, password, tipo, area } = req.body;
    
    // Verificar si el área es obligatorio para usuarios normales
    if (tipo === 'Usuario Normal' && !area) {
      return res.status(400).json({ mensaje: 'El área es obligatoria para usuarios normales' });
    }

    const nuevoUsuario = new Usuario({
      nombre,
      numero,
      dni,
      cargo,
      password,
      tipo,
      area: tipo === 'Usuario Normal' ? area : null, // Asignar el área solo si es un usuario normal
    });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
});



// Definir el endpoint para iniciar sesión
app.post('/login', async (req, res) => {
  try {
    const { numero, password } = req.body;

    const usuario = await Usuario.findOne({ numero });

    if (!usuario || usuario.password !== password) {
      return res.status(401).json({ mensaje: 'Número o contraseña incorrectos' });
    }

    res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
});

// Definir el esquema de museo
const MuseoSchema = new mongoose.Schema({
  area: String,
  fecha: Date,
  venta: String,
  ganancia: Number,
});

const Museo = mongoose.model('Museo', MuseoSchema);

// Definir el endpoint para ingresar datos de Museo
app.post('/museos', async (req, res) => {
  try {
    const { area, fecha, venta, ganancia } = req.body.museo;

    const nuevoMuseo = new Museo({
      area,
      fecha,
      venta,
      ganancia,
    });

    await nuevoMuseo.save();

    res.status(201).json({ mensaje: 'Datos de museo guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar datos del museo:', error);
    res.status(500).json({ mensaje: 'Error al guardar datos del museo' });
  }
});

// Definir el esquema de iglesia
const IglesiaSchema = new mongoose.Schema({
  nombreVenta: String,
  descripcion: String,
  fecha: Date,
});

const Iglesia = mongoose.model('Iglesia', IglesiaSchema);

// Definir el endpoint para ingresar datos de Iglesia
app.post('/iglesias', async (req, res) => {
  try {
    const { nombreVenta, descripcion, fecha } = req.body;

    const nuevaIglesia = new Iglesia({
      nombreVenta,
      descripcion,
      fecha,
    });

    await nuevaIglesia.save();

    res.status(201).json({ mensaje: 'Datos de iglesia guardados correctamente' });
  } catch (error) {
    console.error('Error al guardar datos de la iglesia:', error);
    res.status(500).json({ mensaje: 'Error al guardar datos de la iglesia' });
  }
});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});