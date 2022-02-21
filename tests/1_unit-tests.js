const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('Whole number input', function(done) {
    let input = '40gal'
    assert.equal(convertHandler.getNum(input), 40)
    done()
  })
  test('Decimal number input', function(done) {
    let input = '1.3L'
    assert.equal(convertHandler.getNum(input), 1.3)
    done()
  })
  test('Fractional input', function(done) {
    let input = '1/2km'
    assert.equal(convertHandler.getNum(input), 0.5)
    done()
  })
  test('Fractional input with a decimal', function(done) {
    let input = '2/1.6gal'
    assert.equal(convertHandler.getNum(input), 1.25)
    done()
  })
  test('Error on a double-fraction', function(done) {
    let input = '2/4/4kg'
    assert.isNull(convertHandler.getNum(input), 'is Null')
    done()
  })
  test('No numerical input', function(done) {
    let input = 'gal'
    assert.equal(convertHandler.getNum(input), 1)
    done()
  })
  test('Each valid input unit', function(done) {
    assert.equal(convertHandler.getUnit('4/2gAl'), 'gal')
    assert.equal(convertHandler.getUnit('4.2l'), 'L')
    assert.equal(convertHandler.getUnit('4.3/2kG'), 'kg')
    assert.equal(convertHandler.getUnit('4Km'), 'km')
    assert.equal(convertHandler.getUnit('4.1lBs'), 'lbs')
    assert.equal(convertHandler.getUnit('4.5/6mi'), 'mi')
    done()
  })

  test('Invalid input unit', function(done) {
    assert.isNull(convertHandler.getUnit('4gale'), 'is Null')
    done()
  })
  test('Correct return unit', function(done) {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L')
    assert.equal(convertHandler.getReturnUnit('L'), 'gal')
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
    assert.equal(convertHandler.getReturnUnit('km'), 'mi')
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
    assert.equal(convertHandler.getReturnUnit('mi'), 'km')
    done()
  })
  test('Spell out unit', function(done) {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
    assert.equal(convertHandler.spellOutUnit('L'), 'liters')
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
    done()
  })
  test('Convert gal to L', function(done) {
    assert.approximately(convertHandler.convert(4, 'gal'), 15.14164, 0.1)
    done()
  })
  test('Convert L to gal', function(done) {
    assert.approximately(convertHandler.convert(3.1, 'L'), 0.81893, 0.1)
    done()
  })
  test('Convert kg to lbs', function(done) {
    assert.approximately(convertHandler.convert(0.6666666666666666, 'kg'), 1.46975, 0.1)
    done()
  })

  test('Convert km to mi', function(done) {
    assert.approximately(convertHandler.convert(0.5, 'km'), 0.31069, 0.1)
    done()
  })

  test('Convert lbs to kg', function(done) {
    assert.approximately(convertHandler.convert(6.3, 'lbs'), 2.85763, 0.1)
    done()
  })
  test('Convert mi to km', function(done) {
    assert.approximately(convertHandler.convert(1.3, 'mi'), 2.09214, 0.1)
    done()
  })
});