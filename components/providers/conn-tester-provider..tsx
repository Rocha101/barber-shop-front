import ConnectionTester from "../conn-tester";

const ConnectionTesterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div>{children}</div>;
};

export default ConnectionTesterProvider;
