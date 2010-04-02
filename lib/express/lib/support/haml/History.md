
0.1.0 / 2010-03-31
==================

  * Added "cache" option, making haml.js over 90 times faster than haml-js
  * Improved textBlock whitespace replication
  * Fixed empty tags followed by class / ids on new lines. Closes #6
    You can now do:
       .foo
       .bar
       #baz
         .foo
         .etc

0.0.4 / 2010-03-29
==================

  * Added better error reporting

0.0.3 / 2010-03-29
==================

  * Added "filename" option support to aid in error reporting
  * Added exports.compile() to create intermediate javascript
  * Added `make benchmark`
  * Changed; caching function templates to increase performance
  * Fixed; ids and classes allowing underscores. Closes #5
  * Fixed dedent issue when \n is not followed by whitespace. Closes #8

0.0.2 / 2010-03-26
==================

  * Added haml.js vs haml-js benchmarks
  * Fixed; commenting :javascript CDATA

0.0.1 / 2010-03-26
==================

  * Initial release
