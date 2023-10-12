import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

  // if (request.nextUrl.pathname.startsWith('/cli/usage/uninnstall/')) {
  //   return NextResponse.redirect(new URL('/cli/start/workflows/#uninstall-amplify-cli', request.url))
  // }

  const redirects = [
    {
      source: '/lib/ssr/ssr/q/platform/js/',
      destination: '/lib/ssr/q/platform/js/',
    },
    {
      source: '/cli/function/function/',
      destination: '/cli/function/',
    },
    {
      source: '/lib/ssr/ssr/',
      destination: '/lib/ssr/',
    },
    {
      source: '/cli/plugins/',
      destination: '/cli/plugins/plugins/',
    },
    {
      source: '/cli/usage/tags/',
      destination: '/cli/project/tags/',
    },
    {
      source: '/cli/usage/permissions-boundary/',
      destination: '/cli/project/permissions-boundary/',
    },
    {
      source: '/cli/usage/command-hooks/',
      destination: '/cli/project/command-hooks/',
    },
    {
      source: '/cli/usage/monorepo/',
      destination: '/cli/project/monorepo/',
    },
    {
      // page has ben removed, has note, do we want this redirected elsewhere?
      source: '/cli/usage/iam/',
      destination: '/cli/reference/iam/',
    },
    {
      source: '/cli/usage/iam-roles-mfa/',
      destination: '/cli/reference/iam-roles-mfa/',
    },
    {
      source: '/cli/usage/customcf/',
      destination: '/cli/custom/cloudformation/',
    },
    {
      source: '/cli/usage/upgrade/',
      destination: '/cli/start/workflows/#upgrade-amplify-cli',
    },
    {
      source: '/cli/usage/uninnstall/',
      destination: '/cli/start/workflows/#uninstall-amplify-cli',
    },
    {
      source: '/cli/graphql-transformer/:path*',
      destination: '/cli-legacy/graphql-transformer/:path*',
    },
    {
      source: '/cli-legacy/',
      destination: '/cli/',
    },
    {
      source: '/console/adminui/intro/',
      destination: '/console',
    },
    {
      source: '/ui/customization/theming/q/framework/react/',
      destination: 'https://ui.docs.amplify.aws/react/theming', // updated from https://ui.docs.amplify.aws/theming to remove additional redirect once on UI
    },
    {
      source: '/cli/hosting/',
      destination: '/cli/hosting/hosting',
    },
    {
      // this path does not exist in Amplify UI
      source: '/ui/storage/s3-image-picker/q/framework/:path/',
      destination:
        'https://ui.docs.amplify.aws/components/storage?platform=:path#s3-image-picker',
    },
    {
      source: '/cli/usage/uninstall/',
      destination: '/cli/start/workflows/#uninstall-amplify-cli',
    },
    {
      // consolidated platform specific redirects
      source:
        '/guides/location-service/setting-up-your-app/q/platform/:path/',
      destination: '/lib/geo/getting-started/q/platform/:path/',
    },
    {
      // consolidated platform specific redirects
      source:
        '/guides/location-service/tracking-device-location/q/platform/:path/',
      destination: '/lib/geo/escapehatch/q/platform/:path/',
    },
    {
      // consolidated platform specific redirects
      source: '/lib/auth/social_signin_web_ui/q/platform/:path/',
      destination: '/lib/auth/social/q/platform/:path/',
    },
    {
      source: '/start/q/integration/ionic/',
      destination: '/start/q/integration/js/',
    },
    {
      source: '/start/getting-started/installation/q/integration/ionic/',
      destination: '/start/getting-started/installation/q/integration/js/',
    },
    {
      source: '/lib/in-app-messaging/prerequisites/q/platform/:path/',
      destination:
        '/lib/in-app-messaging/getting-started/q/platform/:path/',
    },
    {
      // consolidated platforms
      source: '/lib/devpreview/getting-started/q/platform/:path/',
      destination: '/lib/project-setup/upgrade-guide/q/platform/:path/',
    },
    {
      source: '/cli/migration/lambda-node-version-update/',
      destination: '/cli/function/configure-options/#updating-the-runtime',
    },
    {
      source: '/lib/in-app-messaging/customize/q/platform/js/',
      destination:
        'https://ui.docs.amplify.aws/react/connected-components/in-app-messaging',
    },
    {
      // made not platform specific
      source: '/guides/storage/transfer-acceleration/q/platform/:path/',
      destination:
        '/lib/storage/transfer-acceleration/q/platform/:path/',
    },
    {
      source: '/lib/auth/customui/q/platform/js/',
      destination:
        'https://ui.docs.amplify.aws/react/connected-components/authenticator',
    },
    {
      source: '/lib/auth/customui/q/platform/react-native/',
      destination:
        'https://ui.docs.amplify.aws/react-native/connected-components/authenticator',
    },
    {
      // made not platform specific
      source:
        '/lib/graphqlapi/create-or-re-use-existing-backend/q/platform/:path',
      destination:
        '/lib/graphqlapi/existing-resources/q/platform/:path/',
    },
    {
      source: '/console/uibuilder/textfieldtoarea/',
      destination: '/console/uibuilder/figmatocode/#figma-file-changelog',
    },
    {
      source: '/cli/graphql/offline-data-access-and-conflict-resolution/',
      destination: '/lib/datastore/conflict/q/platform/js/',
    },
    {
      source: '/console/storage/develop',
      destination: '/console/storage/file-browser/',
    },
    {
      source: '/cli/usage/add-custom-resources',
      destination: '/cli/custom/cdk/',
    },
    {
      // made not platform specific
      source: '/lib/push-notifications/overview/q/platform/:path/',
      destination:
        '/lib/push-notifications/getting-started/q/platform/:path',
    },
    {
      // made not platform specific
      source:
        '/lib/push-notifications/working-with-api/q/platform/:path/',
      destination:
        '/lib/push-notifications/getting-started/q/platform/:path',
    },
    {
      source: '/ui/:path*',
      destination: 'https://ui.docs.amplify.aws/',
    },
    {
      source: '/ui-legacy/:path*',
      destination: 'https://ui.docs.amplify.aws/',
    },
    {
      // destination page doesn't exist
      source: '/ui-legacy/interactions/chatbot/:path*',
      destination: 'https://ui.docs.amplify.aws/components/chatbot',
    }
  ];

  for(let i = 0; i < redirects.length; i++) {
    let path;
    let sourceUrl;
    let destUrl;


    if (redirects[i].source.includes('/:path*')) {     // If redirects have a wildcard path
      sourceUrl = redirects[i].source.slice(0, redirects[i].source.indexOf(':'));

      if (request.nextUrl.pathname.startsWith(sourceUrl)) {
        path = request.nextUrl.pathname.slice(sourceUrl.length, -1);
        destUrl = redirects[i].destination.slice(0, redirects[i].destination.indexOf(':')) + path;
        if(redirects[i].destination.startsWith('/')) {
          return NextResponse.redirect(new URL(destUrl, request.url))
        } else {
          return NextResponse.redirect(new URL(redirects[i].destination))
        }
      }
    } else if (redirects[i].source.includes('/:') && redirects[i].source.includes('/platform/')) {     // If redirect source has a platform variable
      path = request.nextUrl.pathname.slice(request.nextUrl.pathname.indexOf('/platform/') + 10, -1);
      sourceUrl = redirects[i].source.slice(0, redirects[i].source.indexOf(':')) + path + '/';
      destUrl = redirects[i].destination.slice(0, redirects[i].destination.indexOf(':')) + path + '/';

      if (request.nextUrl.pathname.includes(sourceUrl)) {
        return NextResponse.redirect(new URL(destUrl, request.url))
      }
    } else if (request.nextUrl.pathname.includes(redirects[i].source)) {
        return NextResponse.redirect(new URL(redirects[i].destination, request.url))
    }



    
    
    
    
    // if (redirects[i].source.includes('/:path*')) {
    //   sourceUrl = redirects[i].source.slice(0, redirects[i].source.indexOf('/:path*'))
    //   // console.log(sourceUrl)
    // } else if (redirects[i].source.includes('/:') && redirects[i].source.includes('/platform/')) {
    //   path = request.nextUrl.pathname.slice(request.nextUrl.pathname.indexOf('/platform/') + 10, -1);
    //   sourceUrl = redirects[i].source.slice(0, redirects[i].source.indexOf(':')) + path + '/';
    //   // console.log(sourceUrl)

    //   destUrl = redirects[i].destination.slice(0, redirects[i].destination.indexOf(':')) + path + '/';

    //   if (request.nextUrl.pathname.includes(sourceUrl)) {
    //     console.log(redirects[i].destination)
    //     return NextResponse.redirect(new URL(destUrl, request.url))
    //   } else {
    //     // console.log(redirects[i].destination )
    //     // return NextResponse.redirect(new URL(redirects[i].destination))
    //   }
      
    } 
    // else if (redirects[i].source.includes('/:path*')) {
    //     sourceUrl = redirects[i].source.slice(0, redirects[i].source.indexOf(':path*')) + '/';
    //   }

    //   if (request.nextUrl.pathname.includes(sourceUrl)) {
    //     destUrl = redirects[i].destination.slice(0, redirects[i].destination.indexOf(':')) + path + '/';
    //     if(destUrl.startsWith('/')) {
    //       return NextResponse.redirect(new URL(destUrl, request.url))
    //     } else {
    //       return NextResponse.redirect(new URL(redirects[i].destination))

    //     }
    //   }
    // } else {
    //   if (request.nextUrl.pathname.startsWith(redirects[i].source)) {
    //     if(!redirects[i].destination.startsWith('/')) {
    //       return NextResponse.redirect(new URL(redirects[i].destination))
    //     }
    //     return NextResponse.redirect(new URL(redirects[i].destination, request.url))
    //   }    
    // }
  // }

}

export const config = {
  matcher: [
      '/lib/ssr/ssr/q/platform/js/',
      '/cli/function/function/',
      '/lib/ssr/ssr/',
      '/cli/plugins/',
      '/cli/usage/tags/',
      '/cli/usage/permissions-boundary/',
      '/cli/usage/command-hooks/',
      '/cli/usage/monorepo/',
      '/cli/usage/iam/',
      '/cli/usage/iam-roles-mfa/',
      '/cli/usage/customcf/',
      '/cli/usage/upgrade/',
      '/cli/usage/uninnstall/',
      '/cli/graphql-transformer/:path*',
      '/cli-legacy/',
      '/console/adminui/intro/',
      '/ui/customization/theming/q/framework/react/',
      '/cli/hosting/',
      '/ui/storage/s3-image-picker/q/framework/:path/',
      '/cli/usage/uninstall/',
      '/guides/location-service/setting-up-your-app/q/platform/:path/',
      '/guides/location-service/tracking-device-location/q/platform/:path/',
      '/lib/auth/social_signin_web_ui/q/platform/:path/',
      '/start/q/integration/ionic/',
      '/start/getting-started/installation/q/integration/ionic/',
      '/lib/in-app-messaging/prerequisites/q/platform/:path/',
      '/lib/devpreview/getting-started/q/platform/:path/',
      '/cli/migration/lambda-node-version-update/',
      '/lib/in-app-messaging/customize/q/platform/js/',
      '/guides/storage/transfer-acceleration/q/platform/:path/',
      '/lib/auth/customui/q/platform/js/',
      '/lib/auth/customui/q/platform/react-native/',
      '/lib/graphqlapi/create-or-re-use-existing-backend/q/platform/:path',
      '/console/uibuilder/textfieldtoarea/',
      '/cli/graphql/offline-data-access-and-conflict-resolution/',
      '/console/storage/develop',
      '/cli/usage/add-custom-resources',
      '/lib/push-notifications/overview/q/platform/:path/',
      '/lib/push-notifications/working-with-api/q/platform/:path/',
      '/ui/:path*',
      '/ui-legacy/:path*',
      '/ui-legacy/interactions/chatbot/:path*',
  ],
}
