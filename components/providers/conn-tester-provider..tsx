import ConnectionTester from "../conn-tester";

const ConnectionTesterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div>
      {children}
      <ConnectionTester />
    </div>
  );
};

export default ConnectionTesterProvider;
