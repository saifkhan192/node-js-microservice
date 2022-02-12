const V = require('fastest-validator')
const validator = new V()

function validateTab (tabData) {
  const dataPointRules = {
    dataType: { type: 'string' },
    label: { type: 'string' },
    description: { type: 'string' },
    placeholder: { type: 'string', optional: true },
    options: { type: 'array', items: 'string', optional: true }
  }

  const tabRules = {
    name: { type: 'string' },
    description: { type: 'string' },
    dataPoints: { type: 'array', items: { type: 'object', props: dataPointRules } }
  }

  const errors = validator.validate(tabData, tabRules)
  if (Array.isArray(errors)) {
    return errors
  }
  return null
}

function validateTabId (data) {
  const rule = {
    tabId: { type: 'string' }
  }

  const errors = validator.validate(data, rule)
  if (Array.isArray(errors)) {
    return errors
  }
  return null
}

module.exports = { validateTab, validateTabId }
