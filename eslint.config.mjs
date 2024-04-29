import { sxzz } from '@sxzz/eslint-config'

export default sxzz(
  [
    {
      languageOptions: {
        parserOptions: {
          emitDecoratorMetadata: true,
          experimentalDecorators: true,
        },
      },
      rules: {
        eqeqeq: 'off',

        'no-void': 0,
        '@typescript-eslint/consistent-type-imports': 'warn',
        '@typescript-eslint/consistent-type-assertions': 0,
        'no-restricted-syntax': 0,
        'unicorn/filename-case': 0,
        'unicorn/prefer-math-trunc': 0,

        'unused-imports/no-unused-vars': [
          'error',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],

        // for node server runtime
        'require-await': 0,
        'unicorn/no-array-callback-reference': 0,

        'node/prefer-global/process': 0,
        'node/prefer-global/buffer': 'off',
        'no-duplicate-imports': 'off',
        'unicorn/explicit-length-check': 0,
        // readable push syntax
        'unicorn/no-array-push-push': 0,
        'unicorn/prefer-top-level-await': 0,
      },
    },
  ],
  {
    prettier: true,
    markdown: true,
    vue: false, // auto detection
    unocss: false, // auto detection
  },
)
