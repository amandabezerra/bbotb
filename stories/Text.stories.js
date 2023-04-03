import Text from '@/components/Text';

export default {
  title: 'Components/Typography/Text',
  component: Text,
};

const Template = (args) => <Text {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  color: 'primary',
  children: 'Large text',
};

export const Normal = Template.bind({});
Normal.args = {
  size: 'normal',
  color: 'primary',
  children: 'Normal text',
};

export const Primary = Template.bind({});
Primary.args = {
  size: 'normal',
  color: 'primary',
  children: 'Text with primary color',
};

export const Secondary = Template.bind({});
Secondary.args = {
  size: 'normal',
  color: 'secondary',
  children: 'Text with secondary color',
};
Secondary.parameters = {
  backgrounds: {
    default: 'dark',
  },
};

export const WithShadow = Template.bind({});
WithShadow.args = {
  size: 'normal',
  color: 'primary',
  shadow: true,
  children: 'Text with shadow',
};
