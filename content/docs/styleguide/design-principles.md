---
title: Design principles
order: 2
---

The application CSS was created using Bootstrap 3. The SCSS version of Bootstrap was customized to provide the necessary controls for the user interface.

## Changes to Bootstrap

The biggest change in Bootstrap is how navbars are treated. We removed the default navbar component from Bootstrap and provided a navbar component that provides an easier way to place different items on navbar. See the navbar component for the documentation. 

We removed mobile support in general. Application screens should be designed to work with a minimum width of 1024px. If a mobile version is needed, a separate mobile version should be developed that considers mobile usage, using separate templates. At the moment there is no mobile example as the use cases for this seemed rather limited. We decided to focus our efforts on providing the best desktop version possible.

We switched the glyphicons with a custom icon font. This icon font contains a selection of icons. We provide a custom icon font because it is a lighter approach, and would like to limit the amount of icons used across applications. See the icons overview for an index of the icons and the full explanation.
