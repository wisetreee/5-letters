import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const PastSeasonCard = () => {
  return (
    <Card className="py-4 bg-accent-2">
      <CardHeader>
        <CardTitle className="mx-auto">
          <h2>Итоги прошлого сезона</h2>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PastSeasonCard;
