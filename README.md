# MBP Pattern Library Web application
A web application for managing and integrating custom WordPress block patterns, developed on behalf of Mina Bästa Polare for internal use. This part of the project consists of a Laravel backend with React frontend via InertiaJS.

## Project overview
This project aims to streamline the management, categorization and reuse of custom WordPress block patterns. It's a digital solution consisting of two parts; a library where MBP employees can upload, manage and distribute block patterns across multpiple WordPress sites via an API, and a dedicated WordPress plugin. 
  
## Features
* User authentication and access restricted to only MBP employees
* CRUD operations for block patterns, categories and WordPress sites
* File upload and management for block pattern images
* API endpoints secured by API keys associated with a WordPress site
* React frontend with dynamig searching, filtering and pagination
* Export block patterns directly onto WordPress sites
* Responsive UI styled with Tailwind
  

## Usage
Block patterns can be uploaded and sorted into categories in the library, which is synced with the plugin via the library's API.   
To add a custom block pattern to a WordPress site, the site must be registered in the library and the plugin activated using the key generated when registering the site. Patterns can be added to a WordPress site either using the plugin, or via the library.   
The plugin may be downloaded from the WordPress-sites page in the library.