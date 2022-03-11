# challenge
Reto de programación Java

## Antes de iniciar
Antes de iniciar crear la base de datos "challenge"

sudo -u postgres createdb challenge

## Configurar base de datos
Configurar las propiedades de conexión en el aerchivo : 

src/main/resources/application.properties

spring.datasource.url=jdbc:postgresql://localhost:<puerto>/<dbBame>
spring.datasource.username=<usuario>
spring.datasource.password=<clave>
spring.jpa.show-sql=true

## Ejecución
Para ejecutar el proyecto ejecute el comando 

- mvn spring-boot:run
