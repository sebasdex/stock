import FormGrid from "@/components/FormGrid";
import FormEquip from "@/components/equipmentForm/FormEquip";
import TableEquip from "@/components/equipmentForm/TableEquip";

function equipmentPage() {
  return (
    <>
      <FormGrid text={"Agregar Equipo"}>
        <FormEquip />
      </FormGrid>
      <TableEquip />
    </>
  );
}

export default equipmentPage;
