const getType = val => {
  if (Array.isArray(val)) {
    return 'array';
  }

  if (val === null) {
    return 'null';
  }

  if (val instanceof Date) {
    return 'date';
  }

  return typeof val;
};

const mergeObjects = (obj1, obj2) => {
  const newObj = { ...obj1 };
  Object.keys(obj2).forEach(key => {
    const next = obj2[key];
    const prev = obj1[key];
    if (prev) {
      if (typeof next === 'number') {
        newObj[key] = prev + next;
      } else {
        newObj[key] = mergeObjects(prev, next);
      }
    } else {
      newObj[key] = next;
    }
  });

  return newObj;
}

// doesn't work on nested arrays (yet, maybe never)
const reduceDocumentsOrArray = data => {
  const schema = {};
  const types = {};

  data.forEach(doc => {
    const docType = getType(doc);
    types[docType] = (types[docType] || 0) + 1;

    if (docType !== 'object') {
      return;
    }

    Object.keys(doc).forEach(key => {
      const element = doc[key];
      const elementType = getType(element);

      if ((schema[key] || {})[elementType]) {
        schema[key][elementType] += 1;

        if (elementType === 'object') {
          const newObject = reduceDocumentsOrArray([element]).definition;
          schema[key].definition = mergeObjects(schema[key].definition, newObject);
          return;
        }

        if (elementType === 'array') {
          const newOccurences = reduceDocumentsOrArray(element);
          schema[key].occurences = mergeObjects(schema[key].occurences, newOccurences);
          return;
        }
      } else {
        schema[key] = {
          ...(schema[key] || {}),
          [elementType]: 1
        };

        if (elementType === 'object') {
          schema[key].definition = reduceDocumentsOrArray([element]).definition;
          return;
        }

        if (elementType === 'array') {
          schema[key].occurences = reduceDocumentsOrArray(element);
          return;
        }
      }
    });

  });

  if (types.object) {
    types.definition = schema;
  }

  return types;
};

module.exports = { reduceDocumentsOrArray };
