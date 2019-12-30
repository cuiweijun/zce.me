/**
 * Plopfile
 * https://plopjs.com
 */

const moment = require('moment')
const { kebabCase } = require('lodash')

module.exports = plop => {
  plop.setGenerator('post', {
    description: 'Content of an article',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'post title'
      },
      {
        type: 'input',
        name: 'slug',
        message: 'post slug',
        // when: answers => /[\u4e00-\u9fa5]/.test(answers.title),
        default: answers => kebabCase(answers.title)
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'content/posts/{{date}}-{{slug}}/index.md',
        templateFile: 'templates/post.hbs',
        data: {
          date: moment().format('YYYY-MM-DD'),
          datetime: moment().format('YYYY-MM-DD HH:mm')
        }
      }
    ]
  })
}
