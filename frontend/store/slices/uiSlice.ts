import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isAddExpenseModalOpen: boolean;
  isAddGroupModalOpen: boolean;
  isEditExpenseModalOpen: boolean;
  isDeleteExpenseModalOpen: boolean;
  isDeleteGroupModalOpen: boolean;
  isEditGroupModalOpen: boolean;
  isAddMemberModalOpen: boolean;
  isRemoveMemberModalOpen: boolean;
  isSettleUpModalOpen: boolean;
  isViewExpenseModalOpen: boolean;
  isViewGroupModalOpen: boolean;
  isViewMemberModalOpen: boolean;
  isViewSettlementModalOpen: boolean;
  isViewPaymentModalOpen: boolean;
  isViewTransactionModalOpen: boolean;
  isViewReportModalOpen: boolean;
  isViewSettingsModalOpen: boolean;
  isViewProfileModalOpen: boolean;
  isViewNotificationModalOpen: boolean;
  isViewHelpModalOpen: boolean;
  isViewAboutModalOpen: boolean;
  isViewContactModalOpen: boolean;
  isViewTermsModalOpen: boolean;
  isViewPrivacyModalOpen: boolean;
  isViewCookieModalOpen: boolean;
  isViewAccessibilityModalOpen: boolean;
  isViewSitemapModalOpen: boolean;
  isViewSearchModalOpen: boolean;
  isViewFilterModalOpen: boolean;
  isViewSortModalOpen: boolean;
  isViewExportModalOpen: boolean;
  isViewImportModalOpen: boolean;
  isViewShareModalOpen: boolean;
  isViewPrintModalOpen: boolean;
  isViewDownloadModalOpen: boolean;
  isViewUploadModalOpen: boolean;
  isViewDeleteModalOpen: boolean;
  isViewEditModalOpen: boolean;
  isViewAddModalOpen: boolean;
  isViewRemoveModalOpen: boolean;
  isViewCancelModalOpen: boolean;
  isViewConfirmModalOpen: boolean;
  isViewErrorModalOpen: boolean;
  isViewSuccessModalOpen: boolean;
  isViewWarningModalOpen: boolean;
  isViewInfoModalOpen: boolean;
  isViewLoadingModalOpen: boolean;
  isViewProgressModalOpen: boolean;
  isViewFormModalOpen: boolean;
  isViewTableModalOpen: boolean;
  isViewListModalOpen: boolean;
  isViewGridModalOpen: boolean;
  isViewCardModalOpen: boolean;
  isViewMapModalOpen: boolean;
  isViewChartModalOpen: boolean;
  isViewCalendarModalOpen: boolean;
  isViewTimelineModalOpen: boolean;
  isViewGalleryModalOpen: boolean;
  isViewCarouselModalOpen: boolean;
  isViewTabsModalOpen: boolean;
  isViewAccordionModalOpen: boolean;
  isViewMenuModalOpen: boolean;
  isViewNavbarModalOpen: boolean;
  isViewSidebarModalOpen: boolean;
  isViewFooterModalOpen: boolean;
  isViewHeaderModalOpen: boolean;
  isViewMainModalOpen: boolean;
  isViewAsideModalOpen: boolean;
  isViewSectionModalOpen: boolean;
  isViewArticleModalOpen: boolean;
  isViewDivModalOpen: boolean;
  isViewSpanModalOpen: boolean;
  isViewParagraphModalOpen: boolean;
  isViewHeadingModalOpen: boolean;
  isViewButtonModalOpen: boolean;
  isViewInputModalOpen: boolean;
  isViewTextareaModalOpen: boolean;
  isViewSelectModalOpen: boolean;
  isViewCheckboxModalOpen: boolean;
  isViewRadioModalOpen: boolean;
  isViewSwitchModalOpen: boolean;
  isViewSliderModalOpen: boolean;
  isViewProgressBarModalOpen: boolean;
  isViewSpinnerModalOpen: boolean;
  isViewBadgeModalOpen: boolean;
  isViewTooltipModalOpen: boolean;
  isViewPopoverModalOpen: boolean;
  isViewAlertModalOpen: boolean;
  isViewToastModalOpen: boolean;
  isViewModalModalOpen: boolean;
  isViewDrawerModalOpen: boolean;
  isViewDialogModalOpen: boolean;
}

const initialState: UIState = {
  isAddExpenseModalOpen: false,
  isAddGroupModalOpen: false,
  isEditExpenseModalOpen: false,
  isDeleteExpenseModalOpen: false,
  isDeleteGroupModalOpen: false,
  isEditGroupModalOpen: false,
  isAddMemberModalOpen: false,
  isRemoveMemberModalOpen: false,
  isSettleUpModalOpen: false,
  isViewExpenseModalOpen: false,
  isViewGroupModalOpen: false,
  isViewMemberModalOpen: false,
  isViewSettlementModalOpen: false,
  isViewPaymentModalOpen: false,
  isViewTransactionModalOpen: false,
  isViewReportModalOpen: false,
  isViewSettingsModalOpen: false,
  isViewProfileModalOpen: false,
  isViewNotificationModalOpen: false,
  isViewHelpModalOpen: false,
  isViewAboutModalOpen: false,
  isViewContactModalOpen: false,
  isViewTermsModalOpen: false,
  isViewPrivacyModalOpen: false,
  isViewCookieModalOpen: false,
  isViewAccessibilityModalOpen: false,
  isViewSitemapModalOpen: false,
  isViewSearchModalOpen: false,
  isViewFilterModalOpen: false,
  isViewSortModalOpen: false,
  isViewExportModalOpen: false,
  isViewImportModalOpen: false,
  isViewShareModalOpen: false,
  isViewPrintModalOpen: false,
  isViewDownloadModalOpen: false,
  isViewUploadModalOpen: false,
  isViewDeleteModalOpen: false,
  isViewEditModalOpen: false,
  isViewAddModalOpen: false,
  isViewRemoveModalOpen: false,
  isViewCancelModalOpen: false,
  isViewConfirmModalOpen: false,
  isViewErrorModalOpen: false,
  isViewSuccessModalOpen: false,
  isViewWarningModalOpen: false,
  isViewInfoModalOpen: false,
  isViewLoadingModalOpen: false,
  isViewProgressModalOpen: false,
  isViewFormModalOpen: false,
  isViewTableModalOpen: false,
  isViewListModalOpen: false,
  isViewGridModalOpen: false,
  isViewCardModalOpen: false,
  isViewMapModalOpen: false,
  isViewChartModalOpen: false,
  isViewCalendarModalOpen: false,
  isViewTimelineModalOpen: false,
  isViewGalleryModalOpen: false,
  isViewCarouselModalOpen: false,
  isViewTabsModalOpen: false,
  isViewAccordionModalOpen: false,
  isViewMenuModalOpen: false,
  isViewNavbarModalOpen: false,
  isViewSidebarModalOpen: false,
  isViewFooterModalOpen: false,
  isViewHeaderModalOpen: false,
  isViewMainModalOpen: false,
  isViewAsideModalOpen: false,
  isViewSectionModalOpen: false,
  isViewArticleModalOpen: false,
  isViewDivModalOpen: false,
  isViewSpanModalOpen: false,
  isViewParagraphModalOpen: false,
  isViewHeadingModalOpen: false,
  isViewButtonModalOpen: false,
  isViewInputModalOpen: false,
  isViewTextareaModalOpen: false,
  isViewSelectModalOpen: false,
  isViewCheckboxModalOpen: false,
  isViewRadioModalOpen: false,
  isViewSwitchModalOpen: false,
  isViewSliderModalOpen: false,
  isViewProgressBarModalOpen: false,
  isViewSpinnerModalOpen: false,
  isViewBadgeModalOpen: false,
  isViewTooltipModalOpen: false,
  isViewPopoverModalOpen: false,
  isViewAlertModalOpen: false,
  isViewToastModalOpen: false,
  isViewModalModalOpen: false,
  isViewDrawerModalOpen: false,
  isViewDialogModalOpen: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleModal: (state, action: PayloadAction<keyof UIState>) => {
      state[action.payload] = !state[action.payload];
    },
    openModal: (state, action: PayloadAction<keyof UIState>) => {
      state[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<keyof UIState>) => {
      state[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state).forEach((key) => {
        if (key.startsWith('is') && key.endsWith('ModalOpen')) {
          state[key as keyof UIState] = false;
        }
      });
    },
  },
});

export const { toggleModal, openModal, closeModal, closeAllModals } = uiSlice.actions;
export default uiSlice.reducer; 