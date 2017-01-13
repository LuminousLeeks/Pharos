/* Set up the database*/

/* Enable postgis*/

CREATE DATABASE pharos_archieve OWNER pharos_admin;
\c pharos_archieve pharos_admin
CREATE EXTENSION postgis;
\q
/* Environment Data*/
