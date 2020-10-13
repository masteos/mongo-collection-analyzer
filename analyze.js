const getPercent = (val, total) => Math.round((val / total) * 100);

const analyze = (schema, total) => {
  const obj = {};
  for (const key in schema) {
    const el = schema[key];
    const types = Object.keys(el).filter(type => typeof el[type] === 'number');

    types.forEach(type => {
      const value = el[type];
      const required = value === (total || value);
      obj[key] = {
        ...obj[key],
        [type]: {
          required,
          stats: required ? value : `${el[type]}: (${getPercent(el[type], total)}%) of ${total}`,
        }
      };

      if (type === 'object') {
        obj[key][type].objectType = analyze(el.definition, el.object);
      } else if (type === 'array') {
        obj[key][type].arrayType = analyze({ a: el.occurences }).a;
      }
    });
  }

  return obj;
};

module.exports = { analyze };

