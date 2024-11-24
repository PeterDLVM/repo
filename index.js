const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("usuarios.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 10000;

server.use(middlewares);

// Función para verificar si las credenciales coinciden
server.post("/login", (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const usuarios = db.get("usuarios").value();

  const usuario = usuarios.find(
    (user) => user.username === username && user.password === password
  );

  if (usuario) {
    res.status(200).json({
      id: usuario.id,
      username: usuario.username,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol, 
    });
  } else {
    res.status(401).json({ error: "Credenciales incorrectas" });
  }
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
