// ここはコメントです
interface RestParams<T, K extends keyof T> {
  (s: T, e: K[]): Pick<T, Exclude<keyof T, K>>;
}

const __rest: RestParams<any, any> = (s, e) => {
const t: Record<string, any> = {};
  for (const p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") {
for (let i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i] as any) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i] as any] = s[p[i]];
    }
  }
  return t;
};

import { useMemo } from 'react';

interface Route {
  breadcrumbName: string;
  children?: Route[];
  [key: string]: any;
}

interface MenuItem {
  title: string;
  menu?: {
    items: {
      title: string;
      [key: string]: any;
    }[];
  };
  [key: string]: any;
}

function route2item(route: Route): MenuItem {
  const {
      breadcrumbName,
      children
    } = route,
    rest = __rest(route, ["breadcrumbName", "children"]);
  
  const clone: MenuItem = Object.assign({
    title: breadcrumbName
  }, rest);
  
  if (children) {
    clone.menu = {
      items: children.map(childRoute => {
        const {
            breadcrumbName: itemBreadcrumbName
          } = childRoute,
          itemProps = __rest(childRoute, ["breadcrumbName"]);
        
        return Object.assign(Object.assign({}, itemProps), {
          title: itemBreadcrumbName
        });
      })
    };
  }
  
  return clone;
}

export default function useItems(items?: MenuItem[], routes?: Route[]): MenuItem[] | null {
  return useMemo(() => {
    if (items) {
      return items;
    }
    if (routes) {
      return routes.map(route2item);
    }
    return null;
  }, [items, routes]);
}