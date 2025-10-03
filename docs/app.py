from flask import Flask, request, jsonify
from flask_cors import CORS  # Para permitir peticiones del frontend

app = Flask(__name__)
CORS(app)  # Esto permite que tu HTML se comunique con Flask

# Diccionario para almacenar usuarios
usuarios_db = {
    "ana.garcia@ejemplo.com": {
        "id": 1,
        "nombre": "Ana García López",
        "email": "ana.garcia@ejemplo.com",
        "password": "ana123456",
        "tema_preferido": "claro"
    },
    "carlos.martinez@ejemplo.com": {
        "id": 2,
        "nombre": "Carlos Martínez Ruiz", 
        "email": "carlos.martinez@ejemplo.com",
        "password": "carlos789",
        "tema_preferido": "oscuro"
    },
    "laura.chavez@ejemplo.com": {
        "id": 3,
        "nombre": "Laura Chávez Méndez",
        "email": "laura.chavez@ejemplo.com",
        "password": "laura2024",
        "tema_preferido": "auto"
    },
    "david.silva@ejemplo.com": {
        "id": 4,
        "nombre": "David Silva Ortega",
        "email": "david.silva@ejemplo.com",
        "password": "david456",
        "tema_preferido": "claro"
    }
}

ultimo_id = 4  # Porque ya tenemos 4 usuarios

@app.route('/api/registro', methods=['POST'])
def registro():
    datos = request.get_json()
    
    # Validar que vengan todos los datos
    if not datos.get('nombre') or not datos.get('email') or not datos.get('password'):
        return jsonify({
            'success': False,
            'error': 'Faltan datos requeridos'
        }), 400
    
    # Verificar si el usuario ya existe
    if datos['email'] in usuarios_db:
        return jsonify({
            'success': False,
            'error': 'El usuario ya existe'
        }), 400
    
    # Crear nuevo usuario
    global ultimo_id
    ultimo_id += 1
    
    usuarios_db[datos['email']] = {
        "id": ultimo_id,
        "nombre": datos['nombre'],
        "email": datos['email'],
        "password": datos['password'],
        "tema_preferido": datos.get('tema_preferido', 'claro')
    }
    
    print(f"Usuario registrado: {datos['email']}")  # Para ver en consola
    print(f"Usuarios totales: {len(usuarios_db)}")  # Para ver en consola
    
    return jsonify({
        'success': True,
        'message': 'Usuario registrado exitosamente',
        'usuario_id': ultimo_id
    })

@app.route('/api/login', methods=['POST'])
def login():
    datos = request.get_json()
    
    # Buscar usuario
    usuario = usuarios_db.get(datos['email'])
    
    if usuario and usuario['password'] == datos['password']:
        return jsonify({
            'success': True,
            'usuario': {
                'id': usuario['id'],
                'nombre': usuario['nombre'],
                'email': usuario['email'],
                'tema_preferido': usuario['tema_preferido']
            }
        })
    else:
        return jsonify({
            'success': False,
            'error': 'Credenciales incorrectas'
        }), 401

@app.route('/api/usuarios', methods=['GET'])
def listar_usuarios():
    # Solo para pruebas - ver todos los usuarios
    return jsonify(usuarios_db)

if __name__ == '__main__':
    print("🎯 Servidor Flask iniciado en http://localhost:5000")
    print("📝 Endpoints disponibles:")
    print("   POST /api/registro")
    print("   POST /api/login") 
    print("   GET  /api/usuarios (solo desarrollo)")
    app.run(debug=True, port=5000)

