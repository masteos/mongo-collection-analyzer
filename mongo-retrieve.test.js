const model = require('./model.json');
const { reduceDocumentsOrArray } = require('./mongo-retrieve');

test('recurses through the model properly', () => {
  const data = reduceDocumentsOrArray(model);
  expect(data.definition).toEqual({
    _id: { string: 3 },
    keyNumberBoolRequired: { number: 2, boolean: 1 },
    objectRequired: {
      object: 3,
      definition: {
        objectKeyString: { string: 3 },
        objectKeyArray: {
          array: 1,
          occurences: {
            string: 2,
            object: 1,
            definition: {
              wrongData: { string: 1 }
            }
          }
        },
        someOtherObjectKeyArray: {
          array: 1,
          occurences: {
            object: 2,
            definition: {
              with: { string: 2 },
              and: { string: 2 }
            }
          }
        }
      }
    },
    arrayNumberNotRequired: {
      array: 2,
      occurences: { number: 9 }
    }
  });
});

