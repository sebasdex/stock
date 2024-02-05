import FormGrid from "@/components/FormGrid";
import History from "@/components/history/History";
function historyPage() {
  return (
    <FormGrid text={"historial de asignaciones"}>
      <History />
    </FormGrid>
  );
}

export default historyPage;
