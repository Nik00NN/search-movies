const NavBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <nav className="nav-bar">{children}</nav>;
};

export default NavBar;
