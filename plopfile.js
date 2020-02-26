/**
 * Plopfile
 * https://plopjs.com
 */

const moment = require('moment')
const { kebabCase } = require('lodash')

module.exports = plop => {
  plop.setGenerator('post', {
    description: 'Post content',
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
        default: answers => kebabCase(answers.title),
        filter: input => kebabCase(input)
        // when: answers => /[\u4e00-\u9fa5]/.test(answers.title)
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

  plop.setGenerator('page', {
    description: 'Page content',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'page title'
      },
      {
        type: 'input',
        name: 'slug',
        message: 'page slug',
        default: answers => kebabCase(answers.title),
        filter: input => kebabCase(input)
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'content/pages/{{slug}}/index.md',
        templateFile: 'templates/page.hbs'
      }
    ]
  })

  plop.setGenerator('course', {
    description: 'Course content',
    prompts: [
      {
        type: 'input',
        name: 'title',
        message: 'course title'
      },
      {
        type: 'input',
        name: 'slug',
        message: 'course slug',
        default: answers => kebabCase(answers.title),
        filter: input => kebabCase(input)
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'content/courses/{{date}}-{{slug}}/index.md',
        templateFile: 'templates/course.hbs',
        data: {
          date: moment().format('YYYY-MM-DD'),
          datetime: moment().format('YYYY-MM-DD HH:mm')
        }
      }
    ]
  })
}
