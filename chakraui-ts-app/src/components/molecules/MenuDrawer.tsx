import { Drawer, DrawerOverlay, DrawerContent, DrawerBody, Button } from "@chakra-ui/react";
import { memo, VFC } from "react";

type Props = {
  isOpen: boolean
  onClose: () => void
  onClickHome: () => void
  onClickUserManagement: () => void
  onClickSetting: () => void
}

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { isOpen, onClose, onClickHome, onClickUserManagement, onClickSetting } = props
  return (
    <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement='right'
        size="xs"
      >
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={onClickHome}>TOP</Button>    
            <Button w="100%" onClick={onClickUserManagement}>ユーザー一覧</Button>    
            <Button w="100%" onClick={onClickSetting}>設定</Button>    
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
  
})