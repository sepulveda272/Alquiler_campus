# ENDPOINTS

2. Mostrar todos los clientes registrados en la base de datos.

* En este endpoint es donde se genera el JWT para que a continuacion con los demas lo use para que lo pueda validar los metodos get
* * http://localhost:8000/cliente/allcliente

3. Obtener todos los automóviles disponibles para alquiler.

* * http://localhost:8000/automovil/allautomovil

4. Listar todos los alquileres activos junto con los datos de los clientes relacionados.

* * http://localhost:8000/alquiler/alquilerCliente

5. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.

* * http://localhost:8000/reserva/reserva

6. Obtener los detalles del alquiler con el ID_Alquiler específico.

* * http://localhost:8000/alquiler/ (A qui va el numero del id)

7. Listar los empleados con el cargo de "Vendedor".

* * http://localhost:8000/empleado/empleadoV

8. Mostrar la cantidad total de automóvil es disponibles en cada sucursal.

* * http://localhost:8000/sucursal/sucursalesT

9. Obtener el costo total de un alquiler específico.

* * http://localhost:8000/alquiler/costo

10. Listar los clientes con el DNI específico.

* * http://localhost:8000/cliente/clienteDNI

11. Mostrar todos los automóviles con una capacidad mayora 5 personas.

* * http://localhost:8000/automovil/capacidad5

12. Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'.

* * http://localhost:8000/alquiler/fechaInit2023

13. Listar las reservas pendientes realizadas por un cliente específico.

* * http://localhost:8000/cliente/ (A qui va el numero del id)

14. Mostrar los empleados con cargo de "Gerente"o"Asistente".

* * http://localhost:8000/empleado/empleadoC

16. Listar todos los automóviles ordenados por marca y modelo.

* * http://localhost:8000/automovil/ordenarMaMo

17. Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección.

* * http://localhost:8000/sucursal/cantiddadTotal

18. Obtener la cantidad total de alquileres registrados en la base de datos.

* * http://localhost:8000/alquiler/totalRegistro


## Faltaron los puntos 15, 19, 20, 21 pero el resto es FUNCIONAL 