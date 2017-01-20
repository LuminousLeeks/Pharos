/* Set up the database*/

/* Enable postgis*/
CREATE USER pharos_admin PASSWORD 'aware' SUPERUSER;
CREATE DATABASE pharos_db OWNER pharos_admin;
\c pharos_db pharos_admin
CREATE EXTENSION postgis;
\q
/* Environment Data*/
