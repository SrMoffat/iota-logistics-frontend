import {
    // BellOutlined,
    UserOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    CodeSandboxOutlined,
    NodeCollapseOutlined,
    // DeploymentUnitOutlined
} from "@ant-design/icons";

export default [
    {
      href: '/dashboard',
      title: 'Dashboard',
      icon: AppstoreOutlined,
    },
    {
      href: '/products',
      title: 'Products',
      icon: CodeSandboxOutlined,
    },
    // {
    //   href: '/shippments',
    //   title: 'Shippments',
    //   icon: DeploymentUnitOutlined,
    // },
    // {
    //   href: '/notifications',
    //   title: 'Notifications',
    //   icon: BellOutlined,
    // },
    {
      href: '/returns',
      title: 'Returns',
      icon: NodeCollapseOutlined,
    },
    {
      href: '/profile',
      title: 'Profile',
      icon: UserOutlined,
    },
    {
      href: '/signin',
      title: 'Logout',
      icon: LogoutOutlined,
    },
  ];