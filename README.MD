# Documentación: Mejora del Sistema de Gestión de Alquiler de Autos
## Resumen
La presente documentación describe la iniciativa de mejora del sistema de gestión de alquiler y reservas de una empresa dedicada al alquiler de autos. El objetivo principal es optimizar los procesos internos y proporcionar un servicio más eficiente a los clientes. Actualmente, la empresa utiliza una base de datos MongoDB, pero enfrenta desafíos en la integración de información y en la organización del proceso de registro de entrega y devolución de vehículos.

## Problema Identificado
El principal problema identificado es la falta de integración entre las diversas tablas de la base de datos, lo que complica la gestión y seguimiento de alquileres y reservas en las sucursales. Asimismo, el proceso de registro de entrega y devolución de vehículos no está correctamente organizado, lo que puede resultar en errores de datos y un servicio insatisfactorio para los clientes.

## Objetivos de la Mejora
1. **Integración de Información:** Desarrollar una solución que permita la integración de la información de clientes, automóviles, alquileres y reservas en un solo sistema.

2. **Optimización del Proceso de Registro:** Implementar un sistema eficiente de registro de entrega y devolución de vehículos para evitar errores en los datos.

3. **Desarrollo de una Aplicación Web:** Utilizar Node.js y Express para el backend de una aplicación web que facilite el registro de nuevos clientes, la administración de la disponibilidad de automóviles, la realización de alquileres y reservas, y el seguimiento detallado de cada transacción.

4. **Seguridad de la Información:** Implementar un sistema de autenticación basado en JWT (JSON Web Tokens) para garantizar la seguridad de la información.

## Solución Propuesta
La solución propuesta consiste en desarrollar una aplicación web utilizando Node.js y Express para el backend. Se utilizará una base de datos MongoDB para almacenar toda la información relacionada con clientes, automóviles, alquileres, reservas, sucursales y empleados. La aplicación permitirá a los empleados realizar diversas operaciones, como el registro de nuevos clientes, la administración de la disponibilidad de automóviles, la realización de alquileres y reservas, y el seguimiento detallado de cada entrega y devolución de vehículos. Además, se garantizará la seguridad de la información mediante un sistema de autenticación basado en JWT.

## Beneficios Esperados
Con esta solución, la empresa podrá contar con un sistema centralizado y eficiente que mejorará la gestión de todos los procesos relacionados con el alquiler de autos. Esto redundará en una mayor satisfacción de los clientes y aumentará la competitividad en el mercado.

**Fecha de última actualización:** [14/11/2023]

## Recursos Utilizados
* Node.js y Express: Utilizados para el desarrollo del backend de la aplicación.
* MongoDB: Base de datos utilizada para almacenar toda la información.
* JWT (JSON Web Tokens): Sistema de autenticación implementado para garantizar la seguridad de la información.

# ENDPOINTS

1. **Mostrar todos los clientes registrados en la base de datos.**

* http://localhost:8000/get/endpoint1

2. **Obtener todos los automóviles disponibles para alquiler.**

* http://localhost:8000/get/endpoint2

3. **Listar todos los alquileres activos junto con los datos de los clientes relacionados.**

* http://localhost:8000/get/endpoint3

4. **Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.**

* http://localhost:8000/get/endpoint4

5. **Obtener los detalles del alquiler con el ID_Alquiler específico.**

* http://localhost:8000/get/endpoint5/ (A qui va el numero del id)

6. **Listar los empleados con el cargo de "Vendedor".**

* http://localhost:8000/get/endpoint6

7. **Mostrar la cantidad total de automóviles disponibles en cada sucursal.**

* http://localhost:8000/get/endpoint7

8. **Obtener el costo total de un alquiler específico.**

* http://localhost:8000/get/endpoint8

9. **Listar los clientes con el DNI específico.**

* http://localhost:8000/get/endpoint9

10. **Mostrar todos los automóviles con capacidad mayor a 5 personas.**

* http://localhost:8000/get/endpoint10

11. **Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'.**

* http://localhost:8000/get/endpoint11

12. **Listar las reservas pendientes realizadas por un cliente específico.**

* http://localhost:8000/get/endpoint12/ (A qui va el numero del id)

13. **Mostrar los empleados con cargo de "Gerente" o "Asistente".**

* http://localhost:8000/get/endpoint13

14. **Obtener los datos de los clientes que realizaron al menos un alquiler.**

* http://localhost:8000/get/endpoint14

15. **Listar todos los automóviles ordenados por marca y modelo.**

* http://localhost:8000/get/endpoint15

16. **Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.**

* http://localhost:8000/get/endpoint16

17. **Obtener la cantidad total de alquileres registrados en la base de datos.**

* http://localhost:8000/get/endpoint17
