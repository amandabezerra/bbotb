import Button from '@/components/Button';

export default {
  title: 'Components/Core/Button',
  component: Button,
};

const Template = (args) => <Button {...args} />

export const Default = Template.bind({});
Default.args = { label: 'Button' };

export const Disabled = Template.bind({});
Disabled.args = { label: 'Disabled Button', disabled: true };
