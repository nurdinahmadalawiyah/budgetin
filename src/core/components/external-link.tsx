import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { cloneElement, isValidElement, ReactElement, ReactNode } from 'react';
import { Linking, Pressable } from 'react-native';

type ExternalLinkProps = {
  asChild?: boolean;
  children: ReactNode;
  href: string;
};

async function openExternalLink(href: string) {
  if (process.env.EXPO_OS === 'web') {
    await Linking.openURL(href);
    return;
  }

  await openBrowserAsync(href, {
    presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
  });
}

export function ExternalLink({ asChild = false, children, href }: ExternalLinkProps) {
  const handlePress = () => {
    void openExternalLink(href);
  };

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<{ onPress?: () => void }>, {
      onPress: handlePress,
    });
  }

  return <Pressable onPress={handlePress}>{children}</Pressable>;
}
