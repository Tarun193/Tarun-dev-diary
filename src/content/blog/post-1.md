---
title: "First-Class Functions and Closure In Python"
author: "Tarun Chawla"
tags:
  - Python
  - Functions
  - Closure

publishDate: "7/26/2023"

description: "In this insightful article, we will demystify two powerful Python concepts: first-class functions and closures."
---

## What are First-Class Functions?

**first-class functions:** A programming language is said to have first-class functions if it treats functions as first-class citizens. This means that functions are treated the same way as any other entity in the programming language. For example, functions can be passed to other functions, returned by other functions and assigned to a variable just like other objects(int, string etc.). This is an important concept that helps in understanding other concepts such as closures, higher order functions, decorators and many more. Many languages such as `Python`, `JavaScript`, `PHP`, `lua` support first-class functions.

### Assigning function to a variable

_Code:_

```python
def square(x):
  return x * x

# Assigning a function a variable
square_copy  = square

print(square_copy)
print(square)
```

_Output:_

```python
<function square at 0x7fc12daafe20>
<function square at 0x7fc12daafe20>
```

Now, we can see that the variable `square_copy` has the same reference as the `square` function, which means `square_copy` is going to act the same way `square` function is working. As you can see:

_Code:_

```python
print(square(3))
print(square_copy(3))
```

_Output:_

```python
9
9
```

**Note :** While assigning a function to a variable, do not use parentheses, this will execute that function instead of assigning its reference and store the return value in the variable instead of storing function reference. For example, `square_copy = square(2)` will execute the `square` function and return the square of argument.

### Passing function as an argument

Now, take an Example of Python's higher order `filter` function.

_Code:_

```python
def is_even(num):
  """
    if num is divided by 2, the '%' will return 0 as remainder is 0.
    not(0) = True (number is even).
    not(any number except 0) = False (not even).
  """
  return not num % 2

even_numbers = list(filter(is_even, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
# Print all the even_numbers
print(even_numbers)
```

_Output:_

```python
[2, 4, 6, 8, 10]
```

As we can see `filter` function takes `is_even` function as an argument. We can create our own `filter` function.

_Code:_

```python
def is_even(num):
  """
    if num is divided by 2 the '%' will return 0 as remainder is 0.
    not(0) = True (number is even).
    not(any number except 0) is False (not even).
  """
  return not num % 2

# this filter function is not exactly the same as Python's built-in filter function, but it works in a similar way.
def my_filter(function, iterable):
  result = []
  for val in iteratable:
    if function(val):
      result.append(val)
  return result


even_numbers = my_filter(is_even, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
print(even_numbers)
```

_Output:_

```python
[2, 4, 6, 8, 10]
```

The `my_filter` function mimics the functionality of python's higher order `filter` function.

### Returning a function from another function

_code:_

```python
def create_greet():
  def greet():
    print("Hello, how are you?")
  return greet


# this function will return reference to the inner function greet.
new_func = create_greet()

print(new_func)
new_func()
```

_Output:_

```python
<function create_greet.<locals>.greet at 0x000002C847468E00>
Hello, how are you?
```

As you can see, the `create_greet` function returns the `greet` function that was defined within it. We then assign this returned function to the `new_func` variable. Hence, the `new_func` is now acting as `greet` function.

**Note:** While returning function, do not use parentheses `()`, as it will call that function and will return what that function is returning. In this example `return greet()` will call `greet` function and will print `Hello, how are you?` , as `greet` function is returning nothing. So, `return greet()` will return `None`.

_Code:_

```python
def create_greet():
  def greet():
    print("Hello, how are you?")
  return greet() # going to call greet()


# this function will return reference to the inner_function.
new_func = create_greet() # as greet return None, new_func = None

print(new_func)
new_func() # None is not a function, so going to give an error.
```

_Output:_

```python
Hello, how are you?
None
Traceback (most recent call last):
  File "e:\tarun\Chill\test.py", line 11, in <module>
    new_func()
TypeError: 'NoneType' object is not callable
```

## What is Closure?

**Closure:** consider a closure as an imaginary container (enviornment) that stores the function along with the record of surrounding variables.This allows the function to "remember" the values of those variables, even if they no longer exist in memory.

_Code:_

```python
def create_multiplier(x):
    num = x
    def multiplier(n):
        return num * n
    return multiplier

# create a "doubler" function
doubler = create_multiplier(2)

print(doubler(5))  # This will output 10

# create a "tripler" function
tripler = create_multiplier(3)

print(tripler(5))  # This will output 15
```

_Output:_

```python
10
15
```

**Function's Working:** Whenever we call a function, a memory block is created in call stack for that function which stores all the variable associated with that function. Once the function is executed all the memory occupied by the function and it's variable is cleared.

From the _function's working_, we can say that when we called `create_multiplier(2)` a memory block got created in call stack for `create_multiplier` function to store it variables and when the function returned `multiplier` the memory occupied by the function got cleared. This means that the variable `num` would also be removed from memory. However, when we call `doubler`, the function still knows the value of `num`. This is because the closure stores the value of `num` alongside the multiplier function.

## Some Of The Applications

- Can be used to create custom higher order functions.
- fundamentals for understanding the concept of `decorators`.
- Can be used for data encasulation.
