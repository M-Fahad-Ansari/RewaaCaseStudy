# RewaaCaseStudy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma].

## Brief about project:
Models:
    - Purchase Order: id, order, product , payment.
    - Order: supplierName, location ,invoiceNumber, notes.
    - Product: quantity, cost, taxCode.
    - Payment: period, method, paidAmount, dueDate.
    - Product List: id, name.

Autocomplete is for: 
    - Items searched to add in cart.
    - Supplier
    - Location

Formulas:
    - Total cost (Tax inclusive): Quantity * Cost
    - Tax Amount: 15 % of Total Cost
    - Sub Total: Sum of all Total Cost
    - Total Tax: Sum of all Tax amount

UI Library used: Angular Material


