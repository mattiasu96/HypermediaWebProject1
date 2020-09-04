# CamminiAmo

## Table of Contents

1. [Description of the project](#description-of-the-project)
1. [Division of work](#division-of-work)
1. [Client-side languages used](#client-side-languages-used)
1. [Template used](#template-used)
1. [Scripts plugins and fonts from external vendors](#scripts-plugins-and-fonts-from-external-vendors)
1. [Main problems faced during the development](#main-problems-faced-during-the-development)


## Description of the project 

The team implemented a website for an association called "CamminiAmo" that provides free high-quality health services to young people with mental and physical problems. 

We implemented the website starting from the IDM schemas developed in the first part of the course. 

**[Back to top](#table-of-contents)**


## Division of work 

After choosing a common style for the pages and designing the home page and the single topic pages together, every member focused on some elements.

Guido Sergi: Location group page, location single topic pages, who we are

Mattia Suricchio: People group page, people single topic pages, contact us

Luca Zorzenon: Services group page, services single topic pages, Home page

**[Back to top](#table-of-contents)**

## Client-side languages used
Html, CSS, JS

**[Back to top](#table-of-contents)**

## Template used

Our site uses Bootstrap framework  
We decided to use a theme from the web: “Material kit”  https://www.creative-tim.com/product/material-kit

This theme css was build starting from vendor’s scss and bootstrap ones so there is no bootstrap4 link in html webpages but only the material css one. 
This theme came with some JS files and also with some other plugins that we didn’t use.


**[Back to top](#table-of-contents)**

## Scripts plugins and fonts from external vendors

#### Fonts

We used Google Roboto and Roboto Slab fonts: https://fonts.google.com/

#### BaguetteBox for Gallery

http://feimosi.github.io/baguetteBox.js/

**[Back to top](#table-of-contents)**

## Main problems faced during the development

During the development we faced some issues.

Some of them were related to the problem of aligning the style of the different pages. 
(We chose a different style for the “People” page because we thought that a different style would be better for people pictures.)

Some other issues were related to the use of the theme. It was useful because it provided a lot of ready-to-use elements but our design choices made us rewrite part of the core css (and just some fixes in the JS) of the vendor.

The carousel in the home page gave us a lot of problems in the beginning because the images were not put in the right position with the correct width. We resolved the problem by modifying “carousel”, “carousel-inner”, “carousel-item”, “carousel-inner img”, “page-header” and “header-small” in the "material-kit.css".

**[Back to top](#table-of-contents)**









