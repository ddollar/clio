
0.2.6 / 2010-03-18
==================

  * Added Number#{gigabyte,megabyte,kilobyte,byte}[s]
  * Changed; String#lambda etc no longer depricated. Benchmarks proved to be invalid
  * Depricated String#digitize in favour of String#digits
  * Depricated Array#flatten in favour of Array#flattened

0.2.5 / 2010-03-16
==================

  * Removed Object#include()
  * Removed last process.mixin() call
  * Deprecated String#lambda() etc. Closes #64

0.2.4 / 2010-03-15
==================

  * APIs including Number#{seconds,minutes,hours, ...} working in milliseconds not seconds. Closes #63

0.2.3 / 2010-03-15
==================

  * Added Function#curry(), fixed Enumerable#map() which always returns an array now
  * Removed some process.mixin() calls
  * Fixed Object#{keys,values}; can be properly overwritten

0.2.2 / 2010-03-11
==================

  * Fixed Object#keys= allowing custom values to take precedence over Object#keys

0.2.1 / 2010-03-10
==================

  * Added Object#join([str])
  * Fixed reduce() bug in which Object#reduce() was previously skipping
    the first value when a memo object was passed.

0.2.0 / 2010-03-04
==================

  * Added Object#alias()
  * Added Object#include().
  * Added Object#reduce()
  * Aliased Enumerable#reduce() as Enumerable#inject()
  * Added Array#transposed
  * Added String#apply()
  * Added String#call()
  * Added String#lambda
  * Added seed.yml for kiwi support

0.1.0 / 2010-03-01
==================

  * Pretty much everything :)

0.0.1 / 2010-01-05
==================

  * Initial release

