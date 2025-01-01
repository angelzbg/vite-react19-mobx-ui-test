import { observer, useLocalObservable } from 'mobx-react';
import Select from './components/inputs/Select';

const App = observer(() => {
  const state = useLocalObservable(() => ({
    singleselectOptions: [
      {
        name: 'Home Page',
        value: 'home',
        image: 'icon-home.png',
        optionInfo:
          "The icon on the left comes from the option's property 'image'. This text comes from the property 'optionInfo'."
      },
      { name: 'About Us', value: 'about' },
      { name: 'Services', value: 'services' },
      { name: 'Contact', value: 'contact' },
      {
        name: 'This is an option with an extraordinarily long name that just keeps going, far exceeding any practical length, making it a true test for how the display of such an option will be handled in user interfaces across different devices and screen sizes, including mobile, desktop, and tablet views',
        value: 'longnameoption'
      },
      {
        name: 'Frequently Asked Questions (FAQ)',
        value: 'faq'
      },
      {
        name: 'Terms and Conditions',
        value: 'terms',
        disabled: true,
        disabledOptionInfo:
          "This option is disabled by it's property 'disabled'. The user can't select it. This text comes from it's property 'disabledOptionInfo'."
      },
      { name: 'Privacy Policy', value: 'privacy' },
      { name: 'Blog', value: 'blog' },
      { name: 'Careers', value: 'careers' },
      { name: 'Customer Support', value: 'support' },
      { name: 'Affiliate Program', value: 'affiliate' },
      { name: 'Investor Relations', value: 'investors' },
      { name: 'Product Reviews', value: 'reviews' },
      { name: 'Newsletter Signup', value: 'newsletter' },
      { name: 'Case Studies', value: 'casestudies' },
      { name: 'Community Forum', value: 'forum' },
      { name: 'Events', value: 'events' },
      { name: 'Press Releases', value: 'press' },

      { name: 'Feedback', value: 'feedback' }
    ],
    singleselectValue: undefined,
    setSingleselectValue: (value) => {
      state.singleselectValue = value;
    },
    singleselect2Options: [
      {
        name: 'Home Page',
        value: 'home',
        image: 'icon-home.png',
        optionInfo:
          "The icon on the left comes from the option's property 'image'. This text comes from the property 'optionInfo'."
      },
      { name: 'About Us', value: 'about' },
      { name: 'Services', value: 'services' },
      { name: 'Contact', value: 'contact' },
      {
        name: 'This is an option with an extraordinarily long name that just keeps going, far exceeding any practical length, making it a true test for how the display of such an option will be handled in user interfaces across different devices and screen sizes, including mobile, desktop, and tablet views',
        value: 'longnameoption'
      },
      {
        name: 'Frequently Asked Questions (FAQ)',
        value: 'faq'
      },
      {
        name: 'Terms and Conditions',
        value: 'terms',
        disabled: true,
        disabledOptionInfo:
          "This option is disabled by it's property 'disabled'. The user can't select it. This text comes from it's property 'disabledOptionInfo'."
      },
      { name: 'Privacy Policy', value: 'privacy' },
      { name: 'Blog', value: 'blog' },
      { name: 'Careers', value: 'careers' },
      { name: 'Customer Support', value: 'support' },
      { name: 'Affiliate Program', value: 'affiliate' },
      { name: 'Investor Relations', value: 'investors' },
      { name: 'Product Reviews', value: 'reviews' },
      { name: 'Newsletter Signup', value: 'newsletter' },
      { name: 'Case Studies', value: 'casestudies' },
      { name: 'Community Forum', value: 'forum' },
      { name: 'Events', value: 'events' },
      { name: 'Press Releases', value: 'press' },

      { name: 'Feedback', value: 'feedback' }
    ],
    singleselect2Value: undefined,
    setSingleselect2Value: (value) => {
      state.singleselect2Value = value;
    },
    multiselectOptions: [
      {
        name: 'Dashboard',
        value: 'dashboard',
        image: 'icon-dashboard.png',
        optionInfo:
          "The icon on the left comes from the option's property 'image'. This text comes from the property 'optionInfo'."
      },
      {
        name: 'User Profile',
        value: 'user_profile',
        image: 'icon-profile.png',
        disabled: true,
        disabledOptionInfo:
          "This option is disabled by it's property 'disabled'. The user can't deselect it. This text comes from it's property 'disabledOptionInfo'."
      },
      {
        name: 'Settings',
        value: 'settings',
        disabled: true,
        allowDisabledDeselect: true,
        disabledOptionInfo:
          "This option is disabled, but at the same time it's property 'allowDisabledDeselect' allows the deselection. Once the user deselects it and confirms the selections he won't be able to select it again."
      },
      {
        name: 'Notifications',
        value: 'notifications',
        disabled: true,
        disabledOptionInfo: "This option is disabled. The user can't select it."
      },
      { name: 'Reports', value: 'reports', disabled: true },
      {
        name: 'This is an option with an absolutely massive name, so long that it feels like it might never end, written to test every conceivable limit of dropdown menus, list displays, text wrapping logic, and truncation features on user interfaces, ensuring compatibility with all kinds of screen sizes, resolutions, and responsive design frameworks while also challenging developers to handle such ludicrously verbose inputs in a graceful and user-friendly manner that still maintains readability and usability across all devices and software versions currently in use',
        value: 'longnameoption'
      },
      { name: 'Analytics', value: 'analytics' },
      { name: 'Messages', value: 'messages' },
      { name: 'Help Center', value: 'help_center' },
      { name: 'Feedback', value: 'feedback' },
      { name: 'Integrations', value: 'integrations' },
      { name: 'API Documentation', value: 'api_docs' },
      { name: 'System Logs', value: 'system_logs' },
      { name: 'Billing Information', value: 'billing' },
      { name: 'User Permissions', value: 'permissions' },
      { name: 'Account Security', value: 'security' },
      { name: 'Language Preferences', value: 'language' },
      { name: 'Appearance Settings', value: 'appearance' },
      { name: 'Application Updates', value: 'updates' }
    ],
    multiselectValue: ['user_profile', 'settings'],
    setMultiselectValue: (value = []) => {
      state.multiselectValue = value;
    },
    multiselect2Options: [
      { name: 'Dashboard', value: 'dashboard' },
      { name: 'User Profile', value: 'user_profile' },
      { name: 'Settings', value: 'settings' },
      { name: 'Notifications', value: 'notifications' },
      {
        name: 'This is an option with an absolutely massive name, so long that it feels like it might never end, written to test every conceivable limit of dropdown menus, list displays, text wrapping logic, and truncation features on user interfaces, ensuring compatibility with all kinds of screen sizes, resolutions, and responsive design frameworks while also challenging developers to handle such ludicrously verbose inputs in a graceful and user-friendly manner that still maintains readability and usability across all devices and software versions currently in use',
        value: 'longnameoption'
      },
      { name: 'Reports', value: 'reports' },
      { name: 'Analytics', value: 'analytics' },
      { name: 'Messages', value: 'messages' },
      { name: 'Help Center', value: 'help_center' },
      { name: 'Feedback', value: 'feedback' },
      { name: 'Integrations', value: 'integrations' },
      { name: 'API Documentation', value: 'api_docs' },
      { name: 'System Logs', value: 'system_logs' },
      { name: 'Billing Information', value: 'billing' },
      { name: 'User Permissions', value: 'permissions' },
      { name: 'Account Security', value: 'security' },
      { name: 'Language Preferences', value: 'language' },
      { name: 'Appearance Settings', value: 'appearance' },
      { name: 'Application Updates', value: 'updates' }
    ],
    multiselect2Value: ['longnameoption'],
    setMultiselect2Value: (value = []) => {
      state.multiselect2Value = value;
    },
    multiselect3Options: [
      { name: 'Dashboard', value: 'dashboard' },
      { name: 'User Profile', value: 'user_profile' },
      { name: 'Settings', value: 'settings' },
      { name: 'Notifications', value: 'notifications' },
      { name: 'Reports', value: 'reports' },
      { name: 'Analytics', value: 'analytics' },
      { name: 'Messages', value: 'messages' },
      { name: 'Help Center', value: 'help_center' },
      { name: 'Feedback', value: 'feedback' },
      { name: 'Integrations', value: 'integrations' },
      { name: 'API Documentation', value: 'api_docs' },
      { name: 'System Logs', value: 'system_logs' },
      { name: 'Billing Information', value: 'billing' },
      { name: 'User Permissions', value: 'permissions' },
      { name: 'Account Security', value: 'security' },
      { name: 'Language Preferences', value: 'language' },
      { name: 'Appearance Settings', value: 'appearance' },
      { name: 'Application Updates', value: 'updates' }
    ],
    multiselect3Value: [],
    setMultiselect3Value: (value = []) => {
      state.multiselect3Value = value;
    }
  }));
  return (
    <>
      <div className="website-header">This is a functional test, not a styling test</div>
      <div className="website-content">
        <Select
          label="Single select label"
          options={state.singleselectOptions}
          value={state.singleselectValue}
          onChange={state.setSingleselectValue}
          infoMessage="This info message is shown because of the prop 'infoMessage'. 'infoMessage' can be a single string or an array of strings."
        />
        <Select
          label="Single select 2 label"
          required
          options={state.singleselect2Options}
          value={state.singleselect2Value}
          onChange={state.setSingleselect2Value}
          showErrorState
          errorMessage="This error message is shown because of the prop 'showErrorState' and 'errorMessage'. 'errorMessage' can be a single string or an array of strings."
        />
        <Select
          label="Multi select label"
          isMultiSelect
          options={state.multiselectOptions}
          value={state.multiselectValue}
          onChange={state.setMultiselectValue}
        />
        <Select
          label="Multi select 2 label"
          isMultiSelect
          options={state.multiselect2Options}
          value={state.multiselect2Value}
          onChange={state.setMultiselect2Value}
          disabled
          disabledInfo="Test for the 'disabled' prop. This text comes from the prop 'disabledInfo' of the Select component."
        />
        <Select
          label="Multi select 3 label"
          isMultiSelect
          options={state.multiselect3Options}
          value={state.multiselect3Value}
          onChange={state.setMultiselect3Value}
        />
      </div>
    </>
  );
});

export default App;
