# We Are Cube Frontend Boilerplate

## CSS Structure
This structured is based on [the Scalable and Modular
Architecture for CSS: SMACSS](https://smacss.com/)

### Base
Base rules are the defaults. They are almost exclusively single element selectors but it could include attribute selectors, pseudo-class selectors, child selectors or sibling selectors. Essentially, a base style says that wherever this element is on the page.

### Layout
Layout rules divide the page into sections. Layouts hold one or more modules together. We also use Layout rules to define the different key-pages.

    /* Example layout: Header */
    .layout-header { }

### Module
Modules are the reusable, modular parts of our design. They are the callouts, the sidebar sections, the product lists and so on.

    /* Example module: Product */
    .product { }
    
    /* Product list */
    .product-list { }
    
    /* Product name */
    .product-name { }

### State
State rules are ways to describe how our modules or layouts will look when in a particular state. Is it hidden or expanded? Is it active or inactive? They are about describing how a module or layout looks on screens that are smaller or bigger. They are also about describing how a module might look in different views like the home page or the inside page.

    /* Example state: Collapsed Product */
    .product.is-collapsed { }

### Grouping Properties
As many as possible, try to to follow this order:

1. Box (display, position, width, ...)
2. Border (margin, padding, border, ...)
3. Background (background, background-image, ...)
4. Text (color, font-size, line-height, ...)
5. Other (transition, cursor, z-index, ...)

And then pass the mediaqueries, state rules and sub elements (if your selector need to be more specific).

    .product {
      
      // 1. Box
      display: inline-block;
      width: 100%;
      
      // 2. Border
      margin-top: 1rem;
      
      // 3. Background
      background-color: green;
      
      // 4. Text
      color: white;
      
      // 5. Other
      transition: all 300ms ease;
      
      // Media query
      @include susy-breakpoint(30em, 8) {
        width: 50%;
        margin-top: 0;
      }
      
      // Particular State ('.product.is-badass')
      &.is-badass {
        background-color: #BADA55;
      }
      
      // Sub-element (specific selector: '.product .product-title')
      .product-title {
        font-size: 2em;
      }
    }


---