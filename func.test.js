import { sum, record } from './func'
import { read } from './func'

describe('Тестируем функцию sum', () => {
  describe('Тестируем функцию sum', () => {
    test('Проверяем что функция func работает корректно', () => {
      expect(sum(10, 20)).toEqual(30)
      expect(sum(20, 20)).toEqual(40)
      expect(sum(10, 10)).toEqual(20)
    })
  })
})

describe('Тестируем функцию record', () => {
  test('Проверяем что функция record корректно работает с массивом', () => {
    expect(record([], 'one', 'two')).toEqual(['one', 'two'])
    expect(record([], 'one', undefined, 3)).toEqual(['one', undefined, 3])
    expect(record([])).toEqual([])
  })

  test('Проверяем что функция record корректно работает с объектом', () => {
    expect(record({}, 'one', 'two')).toEqual({ 0: 'one', 1: 'two' })
    expect(record({}, 'one', undefined, 3)).toEqual({
      0: 'one',
      1: undefined,
      2: 3,
    })
    expect(record({})).toEqual({})
  })

  test('Проверяем что функция record возвращает null', () => {
    expect(record(1, 'one', 'two')).toEqual(null)
    expect(record('', 'one', undefined, 3)).toEqual(null)
    expect(record(undefined)).toEqual(null)
  })
})

test('Проверка объектов', () => {
  expect({ a: 1 }).toEqual({ a: 1 })
  expect({ a: 1, b: { c: 2 } }).toEqual({ a: 1, b: { c: 2 } })
  expect([1, 2, 'Hello']).toEqual([1, 2, 'Hello'])
})

test('Проверка чисел', () => {
  const value = 2 + 2

  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(4.5)
  expect(value).toBe(4)
  expect(0.1 + 0.2).toBeCloseTo(0.3)
  expect('q').toEqual('q')
})

describe('Тестируем строки', () => {
  test('Тестируем строки', () => {
    const str = 'Hello'

    expect(str).toBe('Hello')
    expect(str).toMatch(/ll/i)
  })
})

test('Тестируем асинхронный код', () => {
  read((content) => {
    expect(content).toMatch(/fs.readFile/i)
  })
})

beforeEach(() => {
  console.log('Эта функция будет вызываться каждый раз перед вызовом теста')
})

afterEach(() => {
  console.log('Эта функция будет вызываться каждый раз после вызова теста')
})

test('Test 1', () => {
  expect(true).toBeTruthy()
})

test('Test 2', () => {
  expect(true).toBeTruthy()
})

beforeEach(() => {
  // Чтобы jest ждал выполнение промиса нужно его возвращать
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        'Этот резолвер выполнится перед выполнением теста и пока он не выполнится тест не вызовется'
      )
    }, 3000)
  })
})

test('Тест mock функции ', () => {
  const mockCallback = jest.fn((x) => 42 + x)

  ;[100, 200].forEach((value) => mockCallback(value))

  // Функция mockCallback была вызвана 2 раза
  expect(mockCallback.mock.calls.length).toBe(2)
  // Первый аргумент первого вызова функции mockCallback был: 100
  expect(mockCallback.mock.calls[0][0]).toBe(100)
  // Первый аргумент второго вызова функции mockCallback был: 200
  expect(mockCallback.mock.calls[1][0]).toBe(200)
  // Результат первого вызова равен 142
  expect(mockCallback.mock.results[0].value).toBe(142)
  // Результат второго вызова равен 242
  expect(mockCallback.mock.results[1].value).toBe(242)
})
