#Codigo para Post Cloud SQL  
Se trata de una API de ejemplo, muy sencilla, con un unico CRUD. La API se conecta a una base de datos en cloud SQL(GCP), de tipo MySQL  
Comandos utiles del ORM


**Model generations**  
npx sequelize-cli model:generate --name User --attributes name:string

**Migrations**  
npx sequelize-cli migration:create --name add_slug_to_page  
npx sequelize-cli db:migrate  
npx sequelize-cli db:migrate:undo

**Seeds**  
npx sequelize-cli seed:generate --name demo-user  
npx sequelize-cli db:seed:all  
npx sequelize-cli db:seed --seed ./path_to_file  
