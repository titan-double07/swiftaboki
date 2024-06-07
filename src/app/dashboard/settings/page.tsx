"use client";
import SettingsOptions from "@/components/dashboard_components/settingsPageComponents/SettingsOptions";
import UserProfile from "@/components/dashboard_components/settingsPageComponents/UserProfile";
import BeneficiariesModal from "@/components/dashboard_components/settingsPageComponents/modals/BeneficiariesModal";
import HelpCenterModal from "@/components/dashboard_components/settingsPageComponents/modals/HelpCenterModal";
import RateAndFees from "@/components/dashboard_components/settingsPageComponents/modals/RateAndFees";
import AccountSecurity from "@/components/dashboard_components/settingsPageComponents/modals/accountSecurity/AccountSecurity";
import LimitsModal from "@/components/dashboard_components/settingsPageComponents/modals/limits/LimitsModal";
import ModalBackDrop from "@/components/modal/ModalBackDrop";
import ApiFetcher from "@/utils/api/Api";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

export default function Page() {
  // state that renders the modal
  const [showModal, setShowModal] = useState(false);

  // handles what modal is to be displayed.
  const [modalType, setModalType] = useState("");

  // handle user logout
  async function handleLogout() {
    try {
      const response = await ApiFetcher.post("/auth/logout");
      enqueueSnackbar(`${response?.data?.message}`, {
        variant: "success",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
      setTimeout(() => {
        window.location.replace("/auth/login");
      }, 500);
    } catch (error: any) {
      enqueueSnackbar(`${error?.response?.data?.data}`, {
        variant: "error",
        anchorOrigin: { vertical: "bottom", horizontal: "right" },
      });
    }
  }

  function openModal(type: string) {
    setModalType(type);
    if (type === "Logout") {
      return;
    }
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="min-h-screen pt-28 mx-12 mt-10 pb-16 ">
      <UserProfile />
      <SettingsOptions openModal={openModal} handleLogout={handleLogout} />

      {showModal && (
        <ModalBackDrop closeModal={closeModal}>
          {modalType === "Help Center" && (
            <HelpCenterModal closeModal={closeModal} />
          )}

          {modalType === "Beneficiaries" && (
            <BeneficiariesModal closeModal={closeModal} />
          )}

          {modalType === "Limits" && <LimitsModal closeModal={closeModal} />}

          {modalType === "Account Security" && (
            <AccountSecurity closeModal={closeModal} />
          )}

          {modalType === "Rate & Fees" && (
            <RateAndFees closeModal={closeModal} />
          )}
        </ModalBackDrop>
      )}
    </div>
  );
}
