#Codigo para Post Cloud SQL

Comandos utiles del ORM
Model generations
npx sequelize-cli model:generate --name User --attributes name:string

Migrations
npx sequelize-cli migration:create --name add_slug_to_page
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
Seeds
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed --seed ./path_to_file