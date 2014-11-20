---
layout: docs
title: Installation
prev_section: quickstart
next_section: usage
permalink: /docs/installation/
---


You may install Mogobiz using one of the two ways below:

1. Through manual setup

2. By finding and downloading one of the preconfigured dockers from the Mogobiz docker repository

### Manual Setup

#### Database setup
Create a database schema and a user. The user should be granted the rights to create tables and sequences.
The PostgreSQL syntax would be
{% highlight sql %}
create role mogobiz password 'changeit' valid until 'infinity';
create database mogobiz with encoding='UTF8' owner=mogobiz;
grant all on database mogobiz to mogobiz;
{% endhighlight %}

Right after starting the Commerce Manager for the first time, we'll limit the user rights.

#### Media Store Setup

Create de folder that will be accessible from the Commerce Manager and from the Commerce Server. This folder usually host all the graphic resources.
{% highlight bash %}
$ mkdir /data/mogobiz
{% endhighlight %}

#### Elasticsearch setup
Download [elasticsearch] and follow the installation instructions.
Add the following setting to the config/elasticsearch.yml file

{% highlight yaml %}
script.disable_dynamic = false
{% endhighlight %}

#### Commerce Manager Setup
In the 'conf' folder, update the mogobiz-config.groovy file

##### Database Settings
{% highlight groovy %}
dataSource {
// username and password set when creating the database
    username = "mogobiz"
    password = "changeit"

// For a PostgreSQL database, uncomment the lines below
    dialect = "org.hibernate.dialect.PostgreSQLDialect"
    driverClassName = "org.postgresql.Driver"
    url = "jdbc:postgresql://localhost/mogobiz"

// For a MySQL database, uncomment the lines below
//    dialect = "org.hibernate.dialect.MySQLDialect"
//    driverClassName = "com.mysql.jdbc.Driver"
//    url = "jdbc:mysql://localhost/mogobiz"

// For a Oracle database, uncomment the lines below
//    dialect = "com.mogobiz.hibernate.OracleDialect"
//    driverClassName = "oracle.jdbc.driver.OracleDriver"
//    url = "jdbc:oracle:thin:@192.168.184.133:1521:orcl"

// For a Derby database, uncomment the lines below
//    dialect = "org.hibernate.dialect.DerbyDialect"
//    driverClassName = "org.apache.derby.jdbc.ClientDriver"
//    url = "jdbc:derby://localhost:1527//Users/hayssams/tmp/db/mogobiz"
}
{% endhighlight %}

##### Import Job Setup
The list of countries the Commerce Manager should import is set in the 'importCountries' section.
Once imported, The list will be imported again if and only if the files modification date is higher than the last imported date.

{% highlight groovy %}
importCountries {
    cron = '0 * * * * ?' // every minute
    codes = 'FR,GB,SN' // set to an empty string to import all countries
    dir = "/data/mogopay/import/countries" // Path to the directory containing reference files
}
{% endhighlight %}

##### Catalog Import Folder
This folder is the temporary folder used for importing and exporting catalogs.
{% highlight groovy %}
impex  {
    path = '/tmp/impex'
}
{% endhighlight %}

##### Media Path
Location to the images used on the online store.

{% highlight groovy %}
resources {
    path = '/data/mogobiz' // reference the Media Store directory 
    url = "http://mogobiz.ebiznext.com/mogobiz"
}
{% endhighlight %}


##### Superadmin credentials
Set the super user credentials. Password is encrypted using SHA-256
{% highlight groovy %}
superadmin {
    login = 'admin@mogobiz.com'
    email = 'admin@mogobiz.com'
    password = '00810cf8b94d6fcb9c5de484d3bec4187620b3e2876e59aab90d852fe0f18fb6' // changeit
}
{% endhighlight %}

##### Email configuration
Used for resetting user password and to confirm user email.

{% highlight groovy %}
// email confirmation
emailConfirmation {
    from = 'mogobiz@gmail.com'
    // 24hr 1000 * 60 * 60 * 24
    maxAge = 86400000 // Lifetime of the confirmation link exchanged with the end user.
}

grails {
    mail {
        from = 'mogobiz@gmail.com'
        host = 'smtp.gmail.com'
        port = 465
        username = 'mogobiz@gmail.com'
        password = '*****'
        props = ['mail.smtp.auth'                  : 'true',
                 'mail.smtp.socketFactory.port'    : '465',
                 'mail.smtp.socketFactory.class'   : 'javax.net.ssl.SSLSocketFactory',
                 'mail.smtp.socketFactory.fallback': 'false']
    }
}
{% endhighlight %}

##### Translation and Access Keys
List of languages proposed for translation and 16char secret used to encode data in email links.
{% highlight groovy %}
application {
    languages = ['fr', 'en', 'de', 'es']
    secret = "1234567890123456"
    demo = true // Setting it to true creates a sample store 
}
{% endhighlight %}

The default sample store is created with the user `partner@mogobiz.com` and password `changeit`.





##### Commerce Manager public URL
The server URL is the URL the end user must use to access the Manager.
{% highlight groovy %}
grails {
    serverURL = "http://store.mogobiz.com/mogobiz"
}
{% endhighlight %}

#### Commerce Server Setup
The Commerce server setup configration files are located in the `conf` directory. The following files need to be configured :

1. session.conf
2. elasticsearch.conf
3. mogopay.conf
4. mogobiz.conf
5. application.conf

If you use OAuth service they you will have to configure the `auth.conf` file
If you use Mobiel Notification services then you will have to configure the `notify.conf` file

##### Elasticsearch Configuration

<table  class="table">
  <thead>
  <tr>
  <th>
  Property
  </th>
  <th>
  Type
  </th>
  <th>
  Default value
  </th>
    <th>
  Description
  </th>
  </tr>
  </thead>
  <tbody>
    <tr>
    <td>
    elasticsearch.data.format
    </td>
    <td>
    String
    </td>
    <td>
    yyyy-MM-dd'T'HH:mm:ss.SSSZZ
    </td>
    <td>
    </td>
    </tr>

    <tr>
    <td>
    host
    </td>
    <td>
    String
    </td>
    <td>
    localhost
    </td>
    <td>
    </td>
    </tr>

    <tr>
    <td>
    port
    </td>
    <td>
    Long
    </td>
    <td>
    9300
    </td>
    <td>
    </td>
    </tr>

    <tr>
    <td>
    http.port
    </td>
    <td>
    Long
    </td>
    <td>
    9200
    </td>
    <td>
    </td>
    </tr>

    <tr>
    <td>
    cluster
    </td>
    <td>
    String
    </td>
    <td>
    elasticsearch
    </td>
    <td>
    </td>
    </tr>
  </tbody>
</table>
{% highlight groovy %}
elasticsearch {
  date.format = "yyyy-MM-dd'T'HH:mm:ss.SSSZZ"
  host = "localhost"
  http.port = 9200
  port = 9300
  cluster = "elasticsearch"
}
{% endhighlight %}

##### Session Configuration

<table  class="table">
  <thead>
  <tr>
  <th>
  Property
  </th>
  <th>
  Type
  </th>
  <th>
  Default value
  </th>
    <th>
  Description
  </th>
  </tr>
  </thead>
  <tbody>
    <tr>
    <td>
    session.esindex
    </td>
    <td>
    String
    </td>
    <td>
    mogosession
    </td>
    <td>
    Elasticsearch index name where the user sessions will be stores
    </td>
    </tr>
    <tr>
    <td>
    session.maxage
    </td>
    <td>
    Long
    </td>
    <td>
    3600
    </td>
    <td>
    Session validity in seconds
    </td>
    </tr>
  </tbody>
</table>

{% highlight groovy %}
session {
  esindex ="mogosession"
  maxage = 3600
}
{% endhighlight %}



[elasticsearch]: http://www.elasticsearch.com/

