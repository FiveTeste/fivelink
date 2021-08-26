FROM php:5.6-apache

RUN a2enmod rewrite
RUN docker-php-ext-install mysql
RUN docker-php-ext-install pdo_mysql