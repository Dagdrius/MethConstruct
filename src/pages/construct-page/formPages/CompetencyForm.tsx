import React from "react";
import Typography from "@mui/material/Typography";
import { TextField, Box } from "@mui/material";
import { FormWrapper } from "./FormWrapper";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type TCompetency = {
  id: string;
  code: string;
  name: string;
  achievementIndicators: TAchievementIndicator[];
};

type TAchievementIndicator = {
  id: string;
  code: string;
  wording: string;
  knowledges?: TIndicatorKnowledge;
  skills?: TIndicatorSkill;
  masterys?: TIndicatorMastery;
};

type TIndicatorKnowledge = {
  id: string;
  knowledgeWording: string;
};
type TIndicatorSkill = {
  id: string;
  skillWording: string;
};
type TIndicatorMastery = {
  id: string;
  masteryWording: string;
};

const competency: TCompetency = {
  id: "1",
  code: "ОПК-1",
  name: "Способен инсталлировать программное и аппаратное обеспечение для информационных и автоматизированных систем",
  achievementIndicators: [
    {
      id: "2",
      code: "И(ОПК-1)-1",
      wording: "Описание индикатора 1.1",
      knowledges: { id: "4", knowledgeWording: "Описание знания 1.1" },
      skills: { id: "5", skillWording: "Описание скилла 1.1 " },
      masterys: { id: "6", masteryWording: "Описание мастери 1.1" },
    },
    {
      id: "3", // Unique id for the second achievement
      code: "И(ОПК-1)-2",
      wording: "Описание индикатора 1.2",
      knowledges: { id: "7", knowledgeWording: "Описание знания 1.2" },
      skills: { id: "8", skillWording: "Описание скилла 1.2" },
      masterys: { id: "9", masteryWording: "Описание мастери 1.2" },
    },
  ],
};
const competency2: TCompetency = {
  id: "10",
  code: "ОПК-2",
  name: "Web программирование",
  achievementIndicators: [
    {
      id: "11",
      code: "И(ОПК-2)-1",
      wording: "Описание индикатора 2.1",
      knowledges: { id: "12", knowledgeWording: "Описание знания 2.1" },
      skills: { id: "13", skillWording: "Описание скилла 2.1" },
      masterys: { id: "14", masteryWording: "Описание мастери 2.1" },
    },
    {
      id: "15", // Unique id for the second achievement
      code: "И(ОПК-2)-2",
      wording: "Описание индикатора 2.2",
      knowledges: { id: "16", knowledgeWording: "Описание знания 2.2" },
      skills: { id: "17", skillWording: "Описание скилла 2.2" },
      masterys: { id: "18", masteryWording: "Описание мастери 2.2" },
    },
  ],
};

const compArray = [competency, competency2];

type CompetencyData = {
  competencies: TCompetency[];
};

type CompetencyFormProps = CompetencyData & {
  updateFields: (fields: Partial<CompetencyData>) => void;
};

export function CompetencyForm({
  competencies,
  updateFields,
}: CompetencyFormProps) {
  const handleSave = () => {
    updateFields({ competencies: compArray });
  };

  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<string>("");
  const [open, setOpen] = React.useState(false);
  const [selectedCode, setSelectedCode] = React.useState("");

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string) => {
    setSelected(nodeIds);
  };

  React.useEffect(() => {
    const selectedNodeId = selected;
    let selectedIndicator;

    // Iterate over each competency in the compArray
    compArray.forEach((competency) => {
      const { achievementIndicators } = competency;

      // Search for the selected indicator within the competency
      const indicator = achievementIndicators.find(
        (indicator) => indicator.id === selectedNodeId
      );

      // If a matching indicator is found, assign it to selectedIndicator
      if (indicator) {
        selectedIndicator = indicator;
      }
    });

    // Check if a selected indicator exists
    if (selectedIndicator) {
      const { wording } = selectedIndicator;

      // Do something with the selected indicator's wording
      console.log(wording);
    }

    // Find the selected competency based on selectedNodeId
    const selectedNode = compArray.find(
      (competency) => competency.id === selectedNodeId
    );

    // Check if a selected competency exists
    if (selectedNode) {
      const { name } = selectedNode;

      // Set the selectedCode state to the name of the selected competency
      setSelectedCode(name);
    }
  }, [selected]);

  return (
    <>
      <FormWrapper title="Компетенции">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ height: "100%", width: "100%" }}
        >
          <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{ flex: 1, minWidth: "100%", overflowY: "auto" }}
            selected={selected}
            expanded={expanded}
            onNodeSelect={handleSelect}
            onNodeToggle={handleToggle}
          >
            {compArray.map((competency) => (
              <TreeItem
                key={competency.id}
                nodeId={competency.id}
                label={competency.code}
              >
                {competency.achievementIndicators.map((achievement) => (
                  <TreeItem
                    key={achievement.id}
                    nodeId={achievement.id}
                    label={achievement.code}
                  >
                    {achievement.knowledges && (
                      <TreeItem
                        key={achievement.knowledges.id}
                        nodeId={achievement.knowledges.id}
                        label={achievement.knowledges.knowledgeWording}
                      ></TreeItem>
                    )}
                    {achievement.skills && (
                      <TreeItem
                        key={achievement.skills.id}
                        nodeId={achievement.skills.id}
                        label={achievement.skills.skillWording}
                      ></TreeItem>
                    )}
                    {achievement.masterys && (
                      <TreeItem
                        key={achievement.masterys.id}
                        nodeId={achievement.masterys.id}
                        label={achievement.masterys.masteryWording}
                      ></TreeItem>
                    )}
                  </TreeItem>
                ))}
              </TreeItem>
            ))}
          </TreeView>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Показать описание
          </Button>
        </Box>
      </FormWrapper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Selected Code</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedCode}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={handleSave}>Save</Button>
    </>
  );
}
