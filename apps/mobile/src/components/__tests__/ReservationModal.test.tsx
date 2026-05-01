import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import { ReservationModal } from "../ReservationModal";
import { useProjectStore } from "../../stores/project.store";
import { CatalogServiceItem } from "../../mocks/catalog";
import { Project } from "@repo/shared";

// Mock hooks
jest.mock("../../hooks/useI18n", () => ({
  useTranslations: () => ({
    t: (key: string) => key,
    getLocalizedName: (_obj: unknown) => "Service",
  }),
}));

const mockService: CatalogServiceItem = {
  zzz_id: 1,
  zzz_name_i18n: { es: "Service" },
  zzz_price: 1000,
  zzz_catalog_category_id: 1,
} as unknown as CatalogServiceItem;

describe("ReservationModal", () => {
  it("should not limit quantity based on project (removed system cap)", () => {
    useProjectStore.setState({
      selectedProject: {
        zzz_id: 1,
      } as unknown as Project,
    });

    render(
      <ReservationModal
        visible={true}
        service={mockService}
        onClose={() => {}}
        onConfirm={() => {}}
      />,
    );

    const plusButton = screen.getByTestId("quantity-plus-button");

    // Press 5 times
    for (let i = 0; i < 5; i++) {
      fireEvent.press(plusButton);
    }

    // Should be 6 (initial 1 + 5 presses)
    expect(screen.getByText("6")).toBeTruthy();
  });
});
