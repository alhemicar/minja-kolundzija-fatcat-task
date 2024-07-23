import {
    IItemsShowcaseProps,
    ItemShowcase,
} from '@homework-task/interfaces/IItemShowcase';

export const ItemsShowcase = ({ items }: IItemsShowcaseProps) => {
    return (
        <div className="flex justify-center items-center">
            <div className="grid grid-cols-2 gap-8 w-8/12">
                {items && items.length
                    ? items.map(({ title, description }: ItemShowcase) => (
                          <div key={title} className="flex flex-col gap-2">
                              <img
                                  src="/media/checkmark.jpg"
                                  width={25}
                                  alt="Checkmark"
                              />
                              <div className="text-2xl font-bold">{title}</div>
                              <p className="">{description}</p>
                          </div>
                      ))
                    : null}
            </div>
        </div>
    );
};
