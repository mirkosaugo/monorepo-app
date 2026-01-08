import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '3cb'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'f7c'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'f96'),
            routes: [
              {
                path: '/apps/adding-apps',
                component: ComponentCreator('/apps/adding-apps', 'fbc'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/apps/docusaurus',
                component: ComponentCreator('/apps/docusaurus', 'ec0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/apps/nextjs-web',
                component: ComponentCreator('/apps/nextjs-web', '991'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/apps/overview',
                component: ComponentCreator('/apps/overview', '0de'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/apps/storybook',
                component: ComponentCreator('/apps/storybook', '6d4'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/components/adding-components',
                component: ComponentCreator('/components/adding-components', '78a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/components/button',
                component: ComponentCreator('/components/button', '960'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/components/card',
                component: ComponentCreator('/components/card', '49e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/components/checkbox',
                component: ComponentCreator('/components/checkbox', '19a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/components/input',
                component: ComponentCreator('/components/input', 'b48'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/components/overview',
                component: ComponentCreator('/components/overview', 'ec0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/getting-started/commands',
                component: ComponentCreator('/getting-started/commands', 'd2c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/getting-started/installation',
                component: ComponentCreator('/getting-started/installation', '654'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/getting-started/project-structure',
                component: ComponentCreator('/getting-started/project-structure', '028'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/guides/claude-code-integration',
                component: ComponentCreator('/guides/claude-code-integration', 'e75'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/guides/development-workflow',
                component: ComponentCreator('/guides/development-workflow', '302'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/guides/how-turborepo-works',
                component: ComponentCreator('/guides/how-turborepo-works', '700'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/guides/renaming-namespace',
                component: ComponentCreator('/guides/renaming-namespace', 'd8b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/packages/adding-packages',
                component: ComponentCreator('/packages/adding-packages', 'eb3'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/packages/overview',
                component: ComponentCreator('/packages/overview', 'd7c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/packages/ui-library',
                component: ComponentCreator('/packages/ui-library', '85f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'fc9'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
