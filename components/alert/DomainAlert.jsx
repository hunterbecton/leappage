import { BiError } from 'react-icons/bi';

export const DomainAlert = ({ isSubdomain, tenant }) => {
  return (
    <div className='rounded-md bg-yellow-50 p-4'>
      <div className='flex'>
        <div className='flex-shrink-0'>
          <BiError className='h-5 w-5 text-yellow-400' />
        </div>
        <div className='ml-3'>
          <h3 className='text-sm font-medium text-yellow-800'>
            Update your DNS settings in your DNS provider to verify domain
          </h3>
          <div className='mt-2 text-sm text-yellow-700'>
            <ul role='list' className='list-disc pl-5 space-y-1'>
              {/* Subdomain instructions */}
              {isSubdomain && (
                <>
                  <li className='py-1'>
                    Add a <code className='bg-yellow-200/60 p-1'>CNAME</code>{' '}
                    record with host{' '}
                    <code className='bg-yellow-200/60 p-1'>@</code> pointing to{' '}
                    <code className='bg-yellow-200/60 p-1'>
                      {tenant.subdomain}.leappage.com
                    </code>
                    .
                  </li>
                </>
              )}
              {/* Domain instructions */}
              {!isSubdomain && (
                <>
                  <li className='py-1'>
                    Add a <code className='bg-yellow-200/60 p-1'>CNAME</code>{' '}
                    record with host{' '}
                    <code className='bg-yellow-200/60 p-1'>@</code> pointing to{' '}
                    <code className='bg-yellow-200/60 p-1'>
                      {tenant.subdomain}.leappage.com
                    </code>
                  </li>
                  <li className='py-1'>
                    Add an <code className='bg-yellow-200/60 p-1'>ANAME</code>{' '}
                    or <code className='bg-yellow-200/60 p-1'>ALIAS</code>{' '}
                    record with host{' '}
                    <code className='bg-yellow-200/60 p-1'>www</code> pointing
                    to{' '}
                    <code className='bg-yellow-200/60 p-1'>
                      {tenant.subdomain}.leappage.com
                    </code>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
