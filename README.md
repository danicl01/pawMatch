# PawMatch - Página Web de Citas para Mascotas

PawMatch es una plataforma de citas para mascotas, similar a aplicaciones como Tinder, donde los dueños pueden hacer "match" con otros propietarios basados en las características de sus mascotas y dueños. Los usuarios pueden crear perfiles para ellos y sus mascotas, especificando detalles como la edad, el sexo, la raza y las preferencias para facilitar las conexiones. La plataforma también ofrece un sistema de chat para facilitar la interacción entre usuarios.

## Características

- **Perfiles de Usuario**: Los usuarios pueden crear un perfil con su información personal y la de sus mascotas.
- **Perfiles de Mascotas**: Cada mascota tiene su propio perfil con detalles como nombre, raza, sexo, edad, peso, tamaño y más.
- **Sistema de guardado de perfiles**: Los usuarios pueden guardar los perfiles que han sido de su interés.
- **Búsquedas por campos o geolocalización**: Los usuarios pueden buscar perfiles específicos o bien filtrando ciertos campos, o buscando los que se encuentran cerca de su posición.
- **Chat en tiempo real**: Los usuarios pueden comunicarse entre sí mediante un sistema de chat.
- **Interfaz amigable y responsive**: La página es compatible con dispositivos móviles y de escritorio.

## Tecnologías

Este proyecto está construido utilizando las siguientes tecnologías:

- **Frontend**: Angular
- **Backend**: Firebase (Firestore)
- **Base de datos**: Firestore (para almacenamiento en tiempo real de datos de usuarios y mascotas)
- **Estilos**: CSS
- **Otras**: Google Maps API (para autocompletar direcciones y geolocalización)

## Instalación

Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona este repositorio:
    ```bash
    git clone https://github.com/danicl01/pawMatch.git
    ```

2. Navega a la carpeta del proyecto:
    ```bash
    cd pawmatch
    ```

3. Instala las dependencias:
    ```bash
    npm install
    ```

4. Inicia el servidor de desarrollo:
    ```bash
    ng serve
    ```

5. Abre tu navegador y accede a la aplicación en `http://localhost:4200`.

## Configuración de Firebase

Para conectar la aplicación a Firebase, sigue estos pasos:

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Agrega tu configuración de Firebase al proyecto en `src/environments/environment.ts`:
    ```typescript
    export const environment = {
      production: false,
      firebaseConfig: {
        apiKey: "TU_API_KEY",
        authDomain: "TU_AUTH_DOMAIN",
        projectId: "TU_PROJECT_ID",
        storageBucket: "TU_STORAGE_BUCKET",
        messagingSenderId: "TU_MESSAGING_SENDER_ID",
        appId: "TU_APP_ID",
        measurementId: "TU_MEASUREMENT_ID"
      }
    };
    ```

3. En Firebase Console, habilita Firestore Database y la autenticación.

## Uso

- Los usuarios pueden registrarse creando un perfil, tanto personal como para su mascota.
- Después de completar el registro, los usuarios pueden buscar otros perfiles de mascotas y guardarlos o directamente chatear con ellos.
- Los usuarios pueden chatear entre sí a través del sistema de mensajería en tiempo real.
