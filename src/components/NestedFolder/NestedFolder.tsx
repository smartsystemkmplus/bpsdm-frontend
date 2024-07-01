import color from '@constants/color';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Accordion, Group } from '@mantine/core';
import cn from '@utils/cn';

export interface NestedFolderItem {
  activeValue?: string;
  value: string;
  title: string;
  child?: Omit<NestedFolderItem, 'child'>[];
}
interface ItemRendererProps extends NestedFolderItem {
  onChange?: (newValue: string) => void;
}
function ItemRenderer({
  activeValue,
  value,
  title,
  child,
  onChange,
}: ItemRendererProps) {
  const isActive = activeValue === value;
  const renderText = () => (
    <p
      className={cn(
        'text-sm',
        isActive ? 'text-primary-main font-bold' : 'text-base-text'
      )}
    >
      {title}
    </p>
  );
  const renderIcon = () => (
    <Icon
      icon={isActive ? 'mdi:folder' : 'mdi:folder-outline'}
      width={20}
      color={isActive ? color.primary.main : color.base.text}
    />
  );

  const handleChange = () => {
    onChange?.(value);
  };

  if (!child?.length) {
    return (
      <button
        type="button"
        onClick={handleChange}
        className={cn(
          'w-full border-b text-start last:border-b-0',
          isActive
            ? 'bg-primary-surface/50'
            : 'hover:bg-base-highlight'
        )}
      >
        <Group py={12} pl={16} gap="sm" wrap="nowrap" align="start">
          <div className="mt-[0.02rem]">{renderIcon()}</div>
          {renderText()}
        </Group>
      </button>
    );
  }

  return (
    <Accordion.Item value={value} className="last:border-0">
      <Accordion.Control
        icon={renderIcon()}
        onClickCapture={handleChange}
        classNames={{
          control: isActive
            ? 'bg-primary-surface/50 hover:bg-primary-surface/50'
            : 'hover:bg-base-highlight',
          icon: 'self-start mt-[0.75rem]',
          chevron: 'self-start mt-[0.85rem]',
        }}
      >
        {renderText()}
      </Accordion.Control>
      <Accordion.Panel>
        {child.map((c) => (
          <ItemRenderer
            key={c.value}
            onChange={onChange}
            activeValue={activeValue}
            value={c.value}
            title={c.title}
          />
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  );
}

interface NestedFolderProps {
  onChange?: (newValue: string) => void;
  value?: string;
  data: NestedFolderItem[];
}
export default function NestedFolder({
  onChange,
  value,
  data = [],
}: NestedFolderProps) {
  return (
    <Accordion>
      {data.map((item) => (
        <ItemRenderer
          key={item.value}
          onChange={onChange}
          activeValue={value}
          value={item.value}
          title={item.title}
          child={item.child}
        />
      ))}
    </Accordion>
  );
}
