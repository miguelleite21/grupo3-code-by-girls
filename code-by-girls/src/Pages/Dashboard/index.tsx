import { Box, Flex, Grid, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CardGroup } from "../../Components/CardGroups";
import Header from "../../Components/Header/header";
import { ModalGroupsDetails } from "../../Components/Modal/ModalGroupsDetails";
import { useDashboard } from "../../Providers/Dashboard";
import { useLogin } from "../../Providers/Login";
import { useProfile } from "../../Providers/Profile";

interface Groups {
  url?: string;
  groupName: string;
  description: string;
  id: number;
}

const Dashboard = () => {
  const { groups } = useDashboard();
  const { data } = useLogin();
  const { getUserData } = useProfile();

  const [selectedGroup, setSelectedGroup] = useState<Groups>({} as Groups);

  useEffect(() => {
    getUserData(data.user.id, data.accessToken);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = (group: Groups) => {
    setSelectedGroup(group);
    onOpen();
  };

  return (
    <Grid>
      <Header input profile />
      <ModalGroupsDetails
        group={selectedGroup}
        isOpen={isOpen}
        onClose={onClose}
      />
      <Flex justifyContent="center" mt="8">
        <Flex w="80%" flexDir="row" flexWrap="wrap" justifyContent={"center"}>
          {groups.map((item) => (
            <Box key={item.id}>
              <CardGroup group={item} onClick={handleClick} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Grid>
  );
};

export default Dashboard;
